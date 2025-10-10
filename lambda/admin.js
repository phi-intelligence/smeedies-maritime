import { NeonStorage } from './neon-storage.js';
import bcrypt from 'bcryptjs';

// Initialize storage
const storage = new NeonStorage(process.env.DATABASE_URL);

export const handler = async (event, context) => {
  const { httpMethod, path, body, headers } = event;
  const parsedBody = JSON.parse(body || '{}');
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
  };
  
  try {
    // Handle CORS preflight
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'CORS preflight' })
      };
    }
    
    const pathSegments = path.split('/').filter(Boolean);
    const endpoint = pathSegments[1]; // admin/[endpoint]
    
    switch (endpoint) {
      case 'login':
        if (httpMethod === 'POST') {
          return await handleAdminLogin(parsedBody, corsHeaders);
        }
        break;
        
      case 'logout':
        if (httpMethod === 'POST') {
          return await handleAdminLogout(corsHeaders);
        }
        break;
        
      case 'status':
        if (httpMethod === 'GET') {
          return await handleAdminStatus(headers, corsHeaders);
        }
        break;
        
      case 'messages':
        if (httpMethod === 'GET') {
          return await handleGetMessages(headers, corsHeaders);
        }
        break;
        
      case 'stats':
        if (httpMethod === 'GET') {
          return await handleGetStats(headers, corsHeaders);
        }
        break;
        
      default:
        // Check if it's a message-specific endpoint (e.g., /admin/messages/:id)
        if (pathSegments[1] === 'messages' && pathSegments[2]) {
          const messageId = pathSegments[2];
          const subEndpoint = pathSegments[3]; // messages/:id/[action]
          
          switch (subEndpoint) {
            case 'read':
              if (httpMethod === 'PATCH') {
                return await handleMarkAsRead(messageId, headers, corsHeaders);
              }
              break;
              
            case undefined: // GET /admin/messages/:id
              if (httpMethod === 'GET') {
                return await handleGetMessage(messageId, headers, corsHeaders);
              }
              if (httpMethod === 'DELETE') {
                return await handleDeleteMessage(messageId, headers, corsHeaders);
              }
              break;
          }
        }
        
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
          body: JSON.stringify({ message: 'Endpoint not found' })
        };
    }
    
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Method not allowed' })
    };
    
  } catch (error) {
    console.error('Admin handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

async function handleAdminLogin(body, corsHeaders) {
  const { username, password } = body;
  
  if (!username || !password) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Username and password required' })
    };
  }
  
  try {
    // For Lambda, we'll use a simple admin check
    // In production, you'd want to store admin credentials securely
    const adminCredentials = {
      username: 'admin',
      password: '$2a$10$YourHashedPasswordHere' // This should be a properly hashed password
    };
    
    // For demo purposes, use a simple check
    if (username === 'admin' && password === 'admin123') {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders,
          'Set-Cookie': `admin-token=${token}; HttpOnly; Secure; SameSite=Strict`
        },
        body: JSON.stringify({ 
          success: true, 
          user: { id: 'admin', username: 'admin' },
          token
        })
      };
    } else {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ message: 'Invalid credentials' })
      };
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Login failed' })
    };
  }
}

async function handleAdminLogout(corsHeaders) {
  return {
    statusCode: 200,
    headers: { 
      'Content-Type': 'application/json', 
      ...corsHeaders,
      'Set-Cookie': 'admin-token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
    },
    body: JSON.stringify({ success: true })
  };
}

async function handleAdminStatus(headers, corsHeaders) {
  // Simple token validation (in production, use proper JWT validation)
  const authHeader = headers.Authorization || headers.authorization;
  const cookieHeader = headers.Cookie || headers.cookie;
  
  let isAuthenticated = false;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Decode and validate token
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      isAuthenticated = decoded.startsWith('admin:');
    } catch (e) {
      isAuthenticated = false;
    }
  } else if (cookieHeader && cookieHeader.includes('admin-token=')) {
    isAuthenticated = true; // Simplified for demo
  }
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify({ 
      authenticated: isAuthenticated,
      user: isAuthenticated ? { id: 'admin', username: 'admin' } : null
    })
  };
}

async function requireAuth(headers) {
  const authHeader = headers.Authorization || headers.authorization;
  const cookieHeader = headers.Cookie || headers.cookie;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      return decoded.startsWith('admin:');
    } catch (e) {
      return false;
    }
  }
  
  return cookieHeader && cookieHeader.includes('admin-token=');
}

async function handleGetMessages(headers, corsHeaders) {
  if (!(await requireAuth(headers))) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }
  
  try {
    const messages = await storage.getAllMessages();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ messages })
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to fetch messages' })
    };
  }
}

async function handleGetMessage(messageId, headers, corsHeaders) {
  if (!(await requireAuth(headers))) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }
  
  try {
    const message = await storage.getMessage(messageId);
    if (!message) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ message: 'Message not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message })
    };
  } catch (error) {
    console.error('Error fetching message:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to fetch message' })
    };
  }
}

async function handleMarkAsRead(messageId, headers, corsHeaders) {
  if (!(await requireAuth(headers))) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }
  
  try {
    const message = await storage.markMessageAsRead(messageId);
    if (!message) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ message: 'Message not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message })
    };
  } catch (error) {
    console.error('Error marking message as read:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to mark message as read' })
    };
  }
}

async function handleDeleteMessage(messageId, headers, corsHeaders) {
  if (!(await requireAuth(headers))) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }
  
  try {
    const deleted = await storage.deleteMessage(messageId);
    if (!deleted) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ message: 'Message not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error deleting message:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to delete message' })
    };
  }
}

async function handleGetStats(headers, corsHeaders) {
  if (!(await requireAuth(headers))) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Unauthorized' })
    };
  }
  
  try {
    const messages = await storage.getAllMessages();
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => !m.metadata?.isRead).length;
    const recentMessages = messages.slice(0, 5);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({
        stats: {
          totalMessages,
          unreadMessages,
          readMessages: totalMessages - unreadMessages
        },
        recentMessages
      })
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to fetch stats' })
    };
  }
}
