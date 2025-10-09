import { z } from "zod";

// User types
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface InsertUser {
  username: string;
  password: string;
}

// Message types
export interface Message {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: Date;
}

export interface InsertMessage {
  name: string;
  email: string;
  company?: string | null;
  service?: string | null;
  message: string;
}

// Admin user types
export interface AdminUser {
  id: string;
  username: string;
  password: string;
  created_at: Date;
}

export interface InsertAdminUser {
  username: string;
  password: string;
}

// Zod validation schemas
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required"),
});

export const insertAdminUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});