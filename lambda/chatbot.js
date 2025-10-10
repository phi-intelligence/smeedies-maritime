import { NeonStorage } from './neon-storage.js';
// import OpenAI from 'openai';

// Initialize storage and OpenAI
const storage = new NeonStorage(process.env.DATABASE_URL);
// const openai = process.env.OPENAI_API_KEY ? new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// }) : null;
const openai = null; // Temporarily disabled

export const handler = async (event, context) => {
  const { httpMethod, path, body } = event;
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
    const endpoint = pathSegments[1]; // chatbot/[endpoint]
    
    switch (endpoint) {
      case 'message':
        if (httpMethod === 'POST') {
          return await handleChatbotMessage(parsedBody, corsHeaders);
        }
        break;
        
      case 'history':
        if (httpMethod === 'GET') {
          const sessionId = pathSegments[2];
          return await handleGetChatHistory(sessionId, corsHeaders);
        }
        break;
        
      case 'escalate':
        if (httpMethod === 'POST') {
          return await handleEscalateChat(parsedBody, corsHeaders);
        }
        break;
        
      default:
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
    console.error('Chatbot handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

async function handleChatbotMessage(body, corsHeaders) {
  const { message, sessionId, userInfo } = body;
  
  if (!message || !sessionId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Message and sessionId are required' })
    };
  }
  
  try {
    // Store user message
    await storage.createMessage({
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId,
      type: 'user',
      message,
      timestamp: new Date().toISOString(),
      metadata: userInfo
    });
    
    // Generate AI response
    let aiResponse = 'I apologize, but I am currently unable to process your request. Please try again later.';
    
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for Smeedies Maritime, a maritime shipping and logistics company based in Ghana. 
              You help customers with questions about:
              - Shipping and logistics services
              - Port operations and stevedoring
              - Customs clearing
              - Warehousing services
              - Project cargo handling
              - Agency services
              
              Be professional, helpful, and concise. If you cannot answer a question, 
              suggest contacting the company directly.`
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        });
        
        aiResponse = completion.choices[0]?.message?.content || aiResponse;
      } catch (openaiError) {
        console.error('OpenAI error:', openaiError);
        // Fallback to keyword-based responses
        aiResponse = getFallbackResponse(message);
      }
    } else {
      // Fallback to keyword-based responses
      aiResponse = getFallbackResponse(message);
    }
    
    // Store AI response
    await storage.createMessage({
      id: `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId,
      type: 'bot',
      message: aiResponse,
      timestamp: new Date().toISOString()
    });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ response: aiResponse })
    };
    
  } catch (error) {
    console.error('Error processing chatbot message:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to process message' })
    };
  }
}

async function handleGetChatHistory(sessionId, corsHeaders) {
  if (!sessionId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Session ID is required' })
    };
  }
  
  try {
    const history = await storage.getChatHistory(sessionId);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ history })
    };
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to fetch chat history' })
    };
  }
}

async function handleEscalateChat(body, corsHeaders) {
  const { sessionId, reason } = body;
  
  if (!sessionId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Session ID is required' })
    };
  }
  
  try {
    // Mark session as escalated
    await storage.escalateSession(sessionId, reason);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ 
        success: true, 
        message: 'Chat escalated to human support' 
      })
    };
  } catch (error) {
    console.error('Error escalating chat:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ message: 'Failed to escalate chat' })
    };
  }
}

function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('shipping') || lowerMessage.includes('cargo')) {
    return 'Smeedies Maritime provides comprehensive shipping and cargo services. We handle container shipping, bulk cargo, and project cargo with reliable logistics solutions. For specific shipping requirements, please contact our team.';
  }
  
  if (lowerMessage.includes('warehouse') || lowerMessage.includes('storage')) {
    return 'We offer secure warehousing services with modern facilities and 24/7 monitoring. Our warehouses are strategically located for efficient distribution. Contact us for warehousing solutions.';
  }
  
  if (lowerMessage.includes('customs') || lowerMessage.includes('clearing')) {
    return 'Our customs clearing services ensure smooth and compliant import/export processes. We handle all documentation and regulatory requirements efficiently.';
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
    return 'You can contact Smeedies Maritime at: Phone: +233 XX XXX XXXX, Email: info@smeediesmaritime.com. Our team is available 24/7 for your maritime needs.';
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('help')) {
    return 'Smeedies Maritime offers shipping, warehousing, customs clearing, stevedoring, and agency services. How can we assist you with your maritime and logistics needs?';
  }
  
  return 'Thank you for contacting Smeedies Maritime. Our team will review your message and get back to you soon. For immediate assistance, please call our 24/7 support line.';
}
