import 'dotenv/config';
import { handler as chatbotHandler } from './chatbot.js';
import { handler as contactHandler } from './contact.js';
import { handler as adminHandler } from './admin.js';
import { handler as healthHandler } from './health.js';

// Main Lambda handler that routes requests
export const handler = async (event, context) => {
  const { httpMethod, path, pathParameters, queryStringParameters, body, headers } = event;
  
  console.log('Lambda Event:', JSON.stringify(event, null, 2));
  
  try {
    // Parse body if it exists
    const parsedBody = body ? JSON.parse(body) : {};
    
    // Route requests based on path and method
    const pathSegments = path.split('/').filter(Boolean);
    
    // Health check
    if (path === '/health' && httpMethod === 'GET') {
      return await healthHandler(event, context);
    }
    
    // Contact form
    if (path === '/contact' && httpMethod === 'POST') {
      return await contactHandler(event, context);
    }
    
    // Chatbot endpoints
    if (pathSegments[0] === 'chatbot') {
      return await chatbotHandler(event, context);
    }
    
    // Admin endpoints
    if (pathSegments[0] === 'admin') {
      return await adminHandler(event, context);
    }
    
    // Default 404
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
      },
      body: JSON.stringify({ message: 'Not Found' })
    };
    
  } catch (error) {
    console.error('Lambda Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
      },
      body: JSON.stringify({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      })
    };
  }
};

// CORS handler for preflight requests
export const corsHandler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
    },
    body: JSON.stringify({ message: 'CORS preflight' })
  };
};
