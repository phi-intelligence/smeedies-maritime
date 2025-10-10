import { neon } from '@neondatabase/serverless';

export class NeonStorage {
  constructor(databaseUrl) {
    this.db = neon(databaseUrl);
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Test connection
      await this.db`SELECT 1`;
      this.initialized = true;
      console.log('✅ NeonStorage initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize NeonStorage:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      await this.initialize();
      await this.db`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async createMessage(messageData) {
    await this.initialize();
    
    try {
      const { id, sessionId, type, message, timestamp, metadata } = messageData;
      
      const result = await this.db`
        INSERT INTO chatbot_messages (id, session_id, type, message, timestamp, metadata)
        VALUES (${id}, ${sessionId}, ${type}, ${message}, ${timestamp}, ${JSON.stringify(metadata || {})})
        RETURNING *
      `;
      
      return result[0];
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  async getMessage(id) {
    await this.initialize();
    
    try {
      const result = await this.db`
        SELECT * FROM chatbot_messages WHERE id = ${id}
      `;
      
      return result[0] || null;
    } catch (error) {
      console.error('Error getting message:', error);
      throw error;
    }
  }

  async getAllMessages() {
    await this.initialize();
    
    try {
      const result = await this.db`
        SELECT * FROM chatbot_messages 
        ORDER BY timestamp DESC
      `;
      
      return result;
    } catch (error) {
      console.error('Error getting all messages:', error);
      throw error;
    }
  }

  async markMessageAsRead(id) {
    await this.initialize();
    
    try {
      const result = await this.db`
        UPDATE chatbot_messages 
        SET metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb), 
          '{isRead}', 
          'true'::jsonb
        )
        WHERE id = ${id}
        RETURNING *
      `;
      
      return result[0] || null;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }

  async deleteMessage(id) {
    await this.initialize();
    
    try {
      const result = await this.db`
        DELETE FROM chatbot_messages WHERE id = ${id}
      `;
      
      return result.count > 0;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  async getChatHistory(sessionId) {
    await this.initialize();
    
    try {
      const result = await this.db`
        SELECT * FROM chatbot_messages 
        WHERE session_id = ${sessionId}
        ORDER BY timestamp ASC
      `;
      
      return result;
    } catch (error) {
      console.error('Error getting chat history:', error);
      throw error;
    }
  }

  async escalateSession(sessionId, reason) {
    await this.initialize();
    
    try {
      // Update all messages in the session to mark as escalated
      await this.db`
        UPDATE chatbot_messages 
        SET metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb), 
          '{escalated}', 
          'true'::jsonb
        ),
        metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb), 
          '{escalationReason}', 
          ${JSON.stringify(reason)}::jsonb
        )
        WHERE session_id = ${sessionId}
      `;
      
      return true;
    } catch (error) {
      console.error('Error escalating session:', error);
      throw error;
    }
  }

  async verifyAdminPassword(username, password) {
    await this.initialize();
    
    try {
      // For Lambda implementation, we'll use a simple check
      // In production, you'd want to store admin credentials in the database
      if (username === 'admin' && password === 'admin123') {
        return {
          id: 'admin',
          username: 'admin'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error verifying admin password:', error);
      throw error;
    }
  }
}
