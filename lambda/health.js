import { DynamoDBStorage } from './dynamodb-storage.js';

// Initialize storage
const storage = new DynamoDBStorage();

export const handler = async (event, context) => {
  const { httpMethod } = event;
  
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
    
    if (httpMethod === 'GET') {
      return await handleHealthCheck(corsHeaders);
    }
    
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Method not allowed' })
    };
    
  } catch (error) {
    console.error('Health handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Health check failed' })
    };
  }
};

async function handleHealthCheck(corsHeaders) {
  try {
    // Check database connectivity
    const isHealthy = await storage.healthCheck();
    
    const healthStatus = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      database: isHealthy ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
      service: 'smeedies-maritime-api',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production'
    };
    
    return {
      statusCode: isHealthy ? 200 : 503,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify(healthStatus)
    };
    
  } catch (error) {
    console.error('Health check error:', error);
    
    const healthStatus = {
      status: 'unhealthy',
      database: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
      service: 'smeedies-maritime-api',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production'
    };
    
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify(healthStatus)
    };
  }
}
