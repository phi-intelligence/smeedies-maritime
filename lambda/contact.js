import { NeonStorage } from './neon-storage.js';
import { z } from 'zod';

// Initialize storage
const storage = new NeonStorage(process.env.DATABASE_URL);

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required')
});

export const handler = async (event, context) => {
  const { httpMethod, body } = event;
  
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
    
    if (httpMethod === 'POST') {
      return await handleContactSubmission(JSON.parse(body || '{}'), corsHeaders);
    }
    
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Method not allowed' })
    };
    
  } catch (error) {
    console.error('Contact handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

async function handleContactSubmission(body, corsHeaders) {
  try {
    // Validate input
    const validatedData = contactSchema.parse(body);
    
    // Create message record
    const message = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId: `contact_${Date.now()}`,
      type: 'contact',
      message: validatedData.message,
      timestamp: new Date().toISOString(),
      metadata: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        service: validatedData.service,
        isRead: false
      }
    };
    
    // Store in database
    await storage.createMessage(message);
    
    // Log the contact form submission
    console.log('Contact form submitted:', {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      service: validatedData.service
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon.' 
      })
    };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ 
          message: 'Invalid form data',
          errors: error.errors
        })
      };
    }
    
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to submit contact form' })
    };
  }
}
