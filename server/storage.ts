import { type User, type InsertUser, type Message, type InsertMessage, type AdminUser, type InsertAdminUser } from "@shared/schema";
import { randomUUID } from "crypto";
import * as bcrypt from "bcryptjs";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message operations
  getAllMessages(): Promise<Message[]>;
  getMessage(id: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessage(id: string, updates: Partial<Message>): Promise<Message | undefined>;
  deleteMessage(id: string): Promise<boolean>;
  markMessageAsRead(id: string): Promise<Message | undefined>;
  
  // Admin user operations
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  verifyAdminPassword(username: string, password: string): Promise<AdminUser | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private messages: Map<string, Message>;
  private adminUsers: Map<string, AdminUser>;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.adminUsers = new Map();
    
    // Create default admin user
    this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const hashedPassword = await bcrypt.default.hash("admin123", 10);
    const adminUser: AdminUser = {
      id: "admin-001",
      username: "admin",
      password: hashedPassword,
      createdAt: new Date()
    };
    this.adminUsers.set("admin-001", adminUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Message operations
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const newMessage: Message = {
      ...message,
      id,
      company: message.company || null,
      service: message.service || null,
      isRead: false,
      createdAt: new Date()
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async updateMessage(id: string, updates: Partial<Message>): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, ...updates };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }

  async markMessageAsRead(id: string): Promise<Message | undefined> {
    return this.updateMessage(id, { isRead: true });
  }

  // Admin user operations
  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.username === username,
    );
  }

  async createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.default.hash(adminUser.password, 10);
    const newAdminUser: AdminUser = {
      ...adminUser,
      id,
      password: hashedPassword,
      createdAt: new Date()
    };
    this.adminUsers.set(id, newAdminUser);
    return newAdminUser;
  }

  async verifyAdminPassword(username: string, password: string): Promise<AdminUser | undefined> {
    const adminUser = await this.getAdminUserByUsername(username);
    if (!adminUser) return undefined;
    
    const isValid = await bcrypt.default.compare(password, adminUser.password);
    return isValid ? adminUser : undefined;
  }
}

export const storage = new MemStorage();
