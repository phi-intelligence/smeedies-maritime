import { neon } from '@neondatabase/serverless';
import { type User, type InsertUser, type Message, type InsertMessage, type AdminUser, type InsertAdminUser } from '@shared/schema';
import { IStorage } from './storage';
import * as bcrypt from 'bcryptjs';

export class NeonStorage implements IStorage {
  private sql: ReturnType<typeof neon>;
  
  constructor(connectionString: string) {
    this.sql = neon(connectionString);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    try {
      const result = await this.sql`
        SELECT id, username, password 
        FROM users 
        WHERE id = ${id}
        LIMIT 1
      `;
      return (result as any[])[0] as User | undefined;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await this.sql`
        SELECT id, username, password 
        FROM users 
        WHERE username = ${username}
        LIMIT 1
      `;
      return (result as any[])[0] as User | undefined;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw new Error('Failed to fetch user by username');
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const result = await this.sql`
        INSERT INTO users (username, password)
        VALUES (${insertUser.username}, ${insertUser.password})
        RETURNING id, username, password
      `;
      return result[0] as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  // Message operations
  async getAllMessages(): Promise<Message[]> {
    try {
      const result = await this.sql`
        SELECT id, name, email, company, service, message, is_read, created_at
        FROM messages 
        ORDER BY created_at DESC
      `;
      return result as Message[];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async getMessage(id: string): Promise<Message | undefined> {
    try {
      const result = await this.sql`
        SELECT id, name, email, company, service, message, is_read, created_at
        FROM messages 
        WHERE id = ${id}
        LIMIT 1
      `;
      return (result as any[])[0] as Message | undefined;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw new Error('Failed to fetch message');
    }
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    try {
      const result = await this.sql`
        INSERT INTO messages (name, email, company, service, message, is_read, created_at)
        VALUES (${message.name}, ${message.email}, ${message.company || null}, ${message.service || null}, ${message.message}, false, CURRENT_TIMESTAMP)
        RETURNING id, name, email, company, service, message, is_read, created_at
      `;
      return (result as any[])[0] as Message;
    } catch (error) {
      console.error('Error creating message:', error);
      throw new Error('Failed to create message');
    }
  }

  async updateMessage(id: string, updates: Partial<Message>): Promise<Message | undefined> {
    try {
      // For now, just return the existing message
      // This can be enhanced later with proper update logic
      return await this.getMessage(id);
    } catch (error) {
      console.error('Error updating message:', error);
      throw new Error('Failed to update message');
    }
  }

  async deleteMessage(id: string): Promise<boolean> {
    try {
      const result = await this.sql`
        DELETE FROM messages 
        WHERE id = ${id}
      `;
      return (result as any[]).length > 0;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Failed to delete message');
    }
  }

  async markMessageAsRead(id: string): Promise<Message | undefined> {
    try {
      const result = await this.sql`
        UPDATE messages 
        SET is_read = true
        WHERE id = ${id}
        RETURNING id, name, email, company, service, message, is_read, created_at
      `;
      return (result as any[])[0] as Message | undefined;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }

  // Admin user operations
  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    try {
      const result = await this.sql`
        SELECT id, username, password, created_at
        FROM admin_users 
        WHERE username = ${username}
        LIMIT 1
      `;
      return (result as any[])[0] as AdminUser | undefined;
    } catch (error) {
      console.error('Error fetching admin user:', error);
      throw new Error('Failed to fetch admin user');
    }
  }

  async createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser> {
    try {
      const hashedPassword = await bcrypt.default.hash(adminUser.password, 10);
      const result = await this.sql`
        INSERT INTO admin_users (username, password, created_at)
        VALUES (${adminUser.username}, ${hashedPassword}, CURRENT_TIMESTAMP)
        RETURNING id, username, password, created_at
      `;
      return (result as any[])[0] as AdminUser;
    } catch (error) {
      console.error('Error creating admin user:', error);
      throw new Error('Failed to create admin user');
    }
  }

  async verifyAdminPassword(username: string, password: string): Promise<AdminUser | undefined> {
    try {
      const adminUser = await this.getAdminUserByUsername(username);
      if (!adminUser) return undefined;
      
      const isValid = await bcrypt.default.compare(password, adminUser.password);
      return isValid ? adminUser : undefined;
    } catch (error) {
      console.error('Error verifying admin password:', error);
      throw new Error('Failed to verify admin password');
    }
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await this.sql`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}
