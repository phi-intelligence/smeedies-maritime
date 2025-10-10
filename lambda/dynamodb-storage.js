import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export class DynamoDBStorage {
  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
    
    this.docClient = DynamoDBDocumentClient.from(this.client);
    this.messagesTableName = process.env.DYNAMODB_TABLE_NAME || 'smeedies-maritime-messages';
    this.adminTableName = process.env.DYNAMODB_ADMIN_TABLE_NAME || 'smeedies-maritime-admin-users';
  }

  // ===== CONTACT FORM METHODS =====

  async createContact(contactData) {
    const message = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'contact',
      name: contactData.name,
      email: contactData.email,
      company: contactData.company,
      service: contactData.service,
      message: contactData.message,
      createdAt: new Date().toISOString(),
      responded: false,
      isRead: false
    };

    const command = new PutCommand({
      TableName: this.messagesTableName,
      Item: message,
    });

    await this.docClient.send(command);
    return message;
  }

  // ===== CHATBOT METHODS =====

  async createChatbotMessage(messageData) {
    const message = {
      id: `${messageData.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: messageData.type,
      sessionId: messageData.sessionId,
      message: messageData.message,
      metadata: messageData.metadata || {},
      createdAt: new Date().toISOString(),
      isRead: false
    };

    const command = new PutCommand({
      TableName: this.messagesTableName,
      Item: message,
    });

    await this.docClient.send(command);
    return message;
  }

  async getChatHistory(sessionId) {
    try {
      // Since we don't have a GSI yet, we'll scan the table
      // In production, you should create a GSI on sessionId
      const command = new ScanCommand({
        TableName: this.messagesTableName,
        FilterExpression: 'sessionId = :sessionId',
        ExpressionAttributeValues: {
          ':sessionId': sessionId,
        },
      });

      const result = await this.docClient.send(command);
      const messages = result.Items || [];
      
      // Sort by creation date (oldest first for chat history)
      return messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }

  async escalateSession(sessionId, reason) {
    try {
      // Get all messages in the session
      const messages = await this.getChatHistory(sessionId);
      
      // Update each message with escalation info
      for (const msg of messages) {
        const command = new UpdateCommand({
          TableName: this.messagesTableName,
          Key: { id: msg.id },
          UpdateExpression: 'SET metadata.escalated = :escalated, metadata.escalationReason = :reason',
          ExpressionAttributeValues: {
            ':escalated': true,
            ':reason': reason,
          },
        });
        
        await this.docClient.send(command);
      }
      
      return true;
    } catch (error) {
      console.error('Error escalating session:', error);
      return false;
    }
  }

  // ===== ADMIN METHODS =====

  async getAllMessages() {
    const command = new ScanCommand({
      TableName: this.messagesTableName,
    });

    const result = await this.docClient.send(command);
    const messages = result.Items || [];
    
    // Sort by creation date (newest first)
    return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getMessage(id) {
    const command = new GetCommand({
      TableName: this.messagesTableName,
      Key: { id },
    });

    const result = await this.docClient.send(command);
    return result.Item || null;
  }

  async markMessageAsRead(id) {
    const command = new UpdateCommand({
      TableName: this.messagesTableName,
      Key: { id },
      UpdateExpression: 'SET isRead = :isRead',
      ExpressionAttributeValues: {
        ':isRead': true,
      },
      ReturnValues: 'ALL_NEW',
    });

    const result = await this.docClient.send(command);
    return result.Attributes || null;
  }

  async deleteMessage(id) {
    const command = new DeleteCommand({
      TableName: this.messagesTableName,
      Key: { id },
    });

    await this.docClient.send(command);
    return true;
  }

  async markContactResponded(id, responseNotes) {
    const command = new UpdateCommand({
      TableName: this.messagesTableName,
      Key: { id },
      UpdateExpression: 'SET responded = :responded, responseNotes = :responseNotes',
      ExpressionAttributeValues: {
        ':responded': true,
        ':responseNotes': responseNotes || '',
      },
      ReturnValues: 'ALL_NEW',
    });

    const result = await this.docClient.send(command);
    return result.Attributes || null;
  }

  // ===== ADMIN USER METHODS =====

  async getAdminUserByUsername(username) {
    const command = new GetCommand({
      TableName: this.adminTableName,
      Key: { username },
    });

    const result = await this.docClient.send(command);
    return result.Item || null;
  }

  async createAdminUser(adminData) {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    
    const adminUser = {
      id: randomUUID(),
      username: adminData.username,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: this.adminTableName,
      Item: adminUser,
    });

    await this.docClient.send(command);
    return adminUser;
  }

  async verifyAdminPassword(username, password) {
    try {
      // Get admin user from DynamoDB
      const adminUser = await this.getAdminUserByUsername(username);
      
      if (adminUser && await bcrypt.compare(password, adminUser.password)) {
        // Update last login timestamp
        await this.docClient.send(new UpdateCommand({
          TableName: this.adminTableName,
          Key: { username },
          UpdateExpression: 'SET lastLogin = :lastLogin',
          ExpressionAttributeValues: {
            ':lastLogin': new Date().toISOString(),
          },
        }));
        
        return adminUser;
      }
      
      return null;
    } catch (error) {
      console.error('Error verifying admin password:', error);
      return null;
    }
  }

  async updateAdminPassword(username, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      const command = new UpdateCommand({
        TableName: this.adminTableName,
        Key: { username },
        UpdateExpression: 'SET password = :password, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':password': hashedPassword,
          ':updatedAt': new Date().toISOString(),
        },
      });
      
      await this.docClient.send(command);
      return true;
    } catch (error) {
      console.error('Error updating admin password:', error);
      return false;
    }
  }

  // ===== UTILITY METHODS =====

  async healthCheck() {
    try {
      const command = new ScanCommand({
        TableName: this.messagesTableName,
        Limit: 1,
      });

      await this.docClient.send(command);
      return true;
    } catch (error) {
      console.error('DynamoDB health check failed:', error);
      return false;
    }
  }

  // Get dashboard statistics
  async getDashboardStats() {
    const messages = await this.getAllMessages();
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => !m.isRead).length;
    const respondedContacts = messages.filter(m => m.type === 'contact' && m.responded).length;
    const recentMessages = messages.slice(0, 5);

    return {
      totalMessages,
      unreadMessages,
      respondedContacts,
      recentMessages
    };
  }
}
