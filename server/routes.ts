import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import type { IStorage } from "./storage";
import { ChatbotService } from "./chatbot";

// Extend session type
declare module 'express-session' {
  interface SessionData {
    adminId?: string;
    adminUsername?: string;
  }
}

export async function registerRoutes(app: Express, storageInstance?: IStorage): Promise<Server> {
  // Use provided storage instance or fallback to default
  const storageToUse = storageInstance || storage;
  
  // Initialize chatbot service
  const chatbotService = new ChatbotService(storageToUse);
  
  // put application routes here
  // prefix all routes with /api

  // Chatbot API endpoints
  app.post("/api/chatbot/message", async (req, res) => {
    try {
      const { message, sessionId, userInfo } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ message: "Message and sessionId are required" });
      }

      const response = await chatbotService.processMessage(sessionId, message, userInfo);
      res.json({ response });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/chatbot/history/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const history = await chatbotService.getChatHistory(sessionId);
      res.json({ history });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  app.post("/api/chatbot/escalate", async (req, res) => {
    try {
      const { sessionId, reason } = req.body;
      await chatbotService.escalateToHuman(sessionId, reason);
      res.json({ success: true, message: "Chat escalated to human support" });
    } catch (error) {
      console.error("Error escalating chat:", error);
      res.status(500).json({ message: "Failed to escalate chat" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Admin authentication middleware
  const requireAuth = async (req: any, res: any, next: any) => {
    const session = req.session;
    if (!session || !session.adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storageToUse.createMessage(validatedData);
      res.json({ success: true, message });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const adminUser = await storageToUse.verifyAdminPassword(username, password);
      
      if (!adminUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      req.session.adminId = adminUser.id;
      req.session.adminUsername = adminUser.username;
      
      res.json({ 
        success: true, 
        user: { id: adminUser.id, username: adminUser.username } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  // Health check endpoint
  app.get("/api/health", async (req, res) => {
    try {
      const isHealthy = await storageToUse.healthCheck();
      if (isHealthy) {
        res.json({ 
          status: 'healthy', 
          database: 'connected',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(503).json({ 
          status: 'unhealthy', 
          database: 'disconnected',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      res.status(503).json({ 
        status: 'unhealthy', 
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Get admin session status
  app.get("/api/admin/status", (req, res) => {
    const session = req.session;
    if (session && session.adminId) {
      res.json({ 
        authenticated: true, 
        user: { id: session.adminId, username: session.adminUsername } 
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Get all messages (admin only)
  app.get("/api/admin/messages", requireAuth, async (req, res) => {
    try {
      const messages = await storageToUse.getAllMessages();
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single message (admin only)
  app.get("/api/admin/messages/:id", requireAuth, async (req, res) => {
    try {
      const message = await storageToUse.getMessage(req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ message });
    } catch (error) {
      console.error("Error fetching message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Mark message as read (admin only)
  app.patch("/api/admin/messages/:id/read", requireAuth, async (req, res) => {
    try {
      const message = await storageToUse.markMessageAsRead(req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ message });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete message (admin only)
  app.delete("/api/admin/messages/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storageToUse.deleteMessage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get dashboard statistics (admin only)
  app.get("/api/admin/stats", requireAuth, async (req, res) => {
    try {
      const messages = await storageToUse.getAllMessages();
      const totalMessages = messages.length;
      const unreadMessages = messages.filter(m => !m.isRead).length;
      const recentMessages = messages.slice(0, 5);

      res.json({
        stats: {
          totalMessages,
          unreadMessages,
          readMessages: totalMessages - unreadMessages
        },
        recentMessages
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
