import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from "crypto";
import * as bcrypt from "bcryptjs";

// DynamoDB Table Schema
export interface Message {
  id: string;                                    // Primary key
  type: 'contact' | 'chatbot_user' | 'chatbot_bot';
  sessionId?: string;                            // For chatbot messages
  name?: string;                                 // Contact form name
  email?: string;                                // Contact form email
  company?: string;                              // Contact form company
  service?: string;                              // Contact form service
  message: string;                               // The actual message
  metadata?: any;                                // Additional data (JSON)
  createdAt: string;                             // ISO timestamp
  isRead?: boolean;                              // For admin panel
  responded?: boolean;                           // For contact forms
  responseNotes?: string;                        // Admin response notes
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  lastLogin?: string;
}

export class DynamoDBStorage {
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;
  private messagesTableName: string;
  private adminTableName: string;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      } : undefined, // Use default credential chain if no explicit credentials
    });
    
    this.docClient = DynamoDBDocumentClient.from(this.client);
    this.messagesTableName = process.env.DYNAMODB_TABLE_NAME || 'smeedies-maritime-messages';
    this.adminTableName = process.env.DYNAMODB_ADMIN_TABLE_NAME || 'smeedies-maritime-admin-users';
  }

  // ===== CONTACT FORM METHODS =====

  async createContact(contactData: {
    name: string;
    email: string;
    company?: string;
    service?: string;
    message: string;
  }): Promise<Message> {
    const message: Message = {
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

  async createChatbotMessage(messageData: {
    sessionId: string;
    type: 'chatbot_user' | 'chatbot_bot';
    message: string;
    metadata?: any;
  }): Promise<Message> {
    const message: Message = {
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

  async getChatHistory(sessionId: string): Promise<Message[]> {
    const command = new QueryCommand({
      TableName: this.messagesTableName,
      IndexName: 'SessionIdIndex', // We'll need to create this GSI
      KeyConditionExpression: 'sessionId = :sessionId',
      ExpressionAttributeValues: {
        ':sessionId': sessionId,
      },
      ScanIndexForward: true, // Sort by createdAt ascending
    });

    const result = await this.docClient.send(command);
    return result.Items as Message[] || [];
  }

  async escalateSession(sessionId: string, reason: string): Promise<boolean> {
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

  async getAllMessages(): Promise<Message[]> {
    const command = new ScanCommand({
      TableName: this.messagesTableName,
    });

    const result = await this.docClient.send(command);
    const messages = result.Items as Message[] || [];
    
    // Sort by creation date (newest first)
    return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getMessage(id: string): Promise<Message | null> {
    const command = new GetCommand({
      TableName: this.messagesTableName,
      Key: { id },
    });

    const result = await this.docClient.send(command);
    return result.Item as Message || null;
  }

  async markMessageAsRead(id: string): Promise<Message | null> {
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
    return result.Attributes as Message || null;
  }

  async deleteMessage(id: string): Promise<boolean> {
    const command = new DeleteCommand({
      TableName: this.messagesTableName,
      Key: { id },
    });

    await this.docClient.send(command);
    return true;
  }

  async markContactResponded(id: string, responseNotes?: string): Promise<Message | null> {
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
    return result.Attributes as Message || null;
  }

  // ===== ADMIN USER METHODS =====

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const command = new GetCommand({
      TableName: this.adminTableName,
      Key: { username },
    });

    const result = await this.docClient.send(command);
    return result.Item as AdminUser || null;
  }

  async createAdminUser(adminData: {
    username: string;
    password: string;
  }): Promise<AdminUser> {
    const hashedPassword = await bcrypt.default.hash(adminData.password, 10);
    
    const adminUser: AdminUser = {
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

  async verifyAdminPassword(username: string, password: string): Promise<AdminUser | null> {
    try {
      const adminUser = await this.getAdminUserByUsername(username);
      if (!adminUser) return null;

      const isValid = await bcrypt.default.compare(password, adminUser.password);
      return isValid ? adminUser : null;
    } catch (error) {
      console.error('Error verifying admin password:', error);
      return null;
    }
  }

  // ===== UTILITY METHODS =====

  async healthCheck(): Promise<boolean> {
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

  // Create default admin user if none exists
  async createDefaultAdmin(): Promise<void> {
    try {
      const existingAdmin = await this.getAdminUserByUsername('admin');
      if (!existingAdmin) {
        await this.createAdminUser({
          username: 'admin',
          password: 'admin123'
        });
        console.log('✅ Default admin user created');
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  }

  // Get dashboard statistics
  async getDashboardStats(): Promise<{
    totalMessages: number;
    unreadMessages: number;
    respondedContacts: number;
    recentMessages: Message[];
  }> {
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
