import 'dotenv/config';
import { NeonStorage } from './neon-storage.js';
import OpenAI from 'openai';

interface ChatMessage {
  id: string;
  sessionId: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface ChatSession {
  id: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  company?: string;
  service?: string;
  status: 'active' | 'closed' | 'escalated';
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export class ChatbotService {
  private storage: NeonStorage;
  private openai: OpenAI | null = null;

  constructor(storage: NeonStorage) {
    this.storage = storage;
    
    // Initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      console.log('✅ OpenAI initialized successfully');
    } else {
      console.log('⚠️ OpenAI API key not found, using fallback responses');
    }
  }

  // Process incoming message and generate response
  async processMessage(sessionId: string, userMessage: string, userInfo?: any): Promise<string> {
    try {
      // Store user message
      await this.storeMessage(sessionId, 'user', userMessage, userInfo);

      // Generate bot response
      const botResponse = await this.generateResponse(userMessage, sessionId, userInfo);

      // Store bot response
      await this.storeMessage(sessionId, 'bot', botResponse);

      return botResponse;
    } catch (error) {
      console.error('Error processing chatbot message:', error);
      return "I apologize, but I'm having trouble processing your message right now. Please try again or contact us directly at info@smeedies.com";
    }
  }

  // Generate intelligent response based on user message
  private async generateResponse(userMessage: string, sessionId: string, userInfo?: any): Promise<string> {
    // Try OpenAI first if available
    if (this.openai) {
      try {
        const response = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful maritime shipping assistant for Smeedies Maritime, a premier shipping agency in West Africa. 
              You provide expert guidance on:
              - Ship Agency Services (vessel clearance, pilot services, port operations)
              - Freight Forwarding (container shipping, cargo consolidation)
              - Customs Clearing (import/export documentation, HS codes, duty calculation)
              - Port Operations (terminal operations, berth allocation, cargo handling)
              
              Key information:
              - Operating in West Africa with 40+ countries network
              - 24/7 emergency support
              - Major ports: Tema (Ghana), Takoradi (Ghana), Lagos (Nigeria)
              - Contact: info@smeedies.com, +233 30 123 4567
              
              Always be professional, helpful, and provide specific maritime industry guidance for Smeedies Maritime.`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        });

        const aiResponse = response.choices[0]?.message?.content;
        if (aiResponse) {
          return aiResponse;
        }
      } catch (error) {
        console.error('OpenAI API error:', error);
        // Fall back to keyword-based responses
      }
    }

    // Fallback to keyword-based responses
    const message = userMessage.toLowerCase();

    // Greeting responses
    if (this.containsWords(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
      return "Hello! Welcome to Smeedies Maritime. I'm here to help with your maritime shipping needs. How can I assist you today?";
    }

    // Ship Agency services
    if (this.containsWords(message, ['ship agency', 'vessel', 'port', 'clearance', 'pilot', 'tug'])) {
      return "I can help you with our Ship Agency services! We provide:\n• Vessel clearance and documentation\n• Pilot and tug services\n• Port operations support\n• Customs clearance\n\nWould you like a quote for your vessel operations? Please provide your vessel details and ETA.";
    }

    // Freight Forwarding
    if (this.containsWords(message, ['freight', 'cargo', 'shipping', 'container', 'export', 'import'])) {
      return "Our Freight Forwarding services include:\n• Container shipping\n• Cargo consolidation\n• Export/import documentation\n• Insurance coverage\n• Door-to-door delivery\n\nWhat type of cargo are you shipping? I can provide a detailed quote.";
    }

    // Customs Clearing
    if (this.containsWords(message, ['customs', 'clearance', 'documentation', 'hs code', 'duty'])) {
      return "We offer comprehensive Customs Clearing services:\n• Import/export documentation\n• HS code classification\n• Duty calculation\n• Customs clearance\n• Bonded warehouse services\n\nPlease share your cargo details and I'll help you with the clearance process.";
    }

    // Port Operations
    if (this.containsWords(message, ['port operations', 'terminal', 'berth', 'crane', 'stevedoring'])) {
      return "Our Port Operations services include:\n• Terminal operations\n• Berth allocation\n• Cargo handling\n• Stevedoring services\n• Container yard management\n\nWhich port are you interested in? We operate in Tema, Takoradi, and other major West African ports.";
    }

    // Quote requests
    if (this.containsWords(message, ['quote', 'price', 'cost', 'rate', 'estimate'])) {
      return "I'd be happy to provide you with a quote! To give you the most accurate pricing, I need some details:\n• Type of service needed\n• Cargo details (if applicable)\n• Origin and destination\n• Timeline requirements\n\nCould you provide these details so I can prepare a customized quote for you?";
    }

    // Contact information
    if (this.containsWords(message, ['contact', 'phone', 'email', 'address', 'office'])) {
      return "You can reach us at:\n📧 Email: info@smeedies.com\n📞 Phone: +233 30 123 4567\n🏢 Address: Tema Port, Ghana\n🌐 Website: www.smeedies.com\n\nWould you like to schedule a call or meeting?";
    }

    // Emergency/Urgent
    if (this.containsWords(message, ['urgent', 'emergency', 'asap', 'immediately', 'rush'])) {
      return "I understand this is urgent! For immediate assistance, please:\n📞 Call our 24/7 hotline: +233 30 123 4567\n📧 Email: emergency@smeedies.com\n\nI'll also escalate this to our operations team right away. What's the nature of your urgent request?";
    }

    // Hours of operation
    if (this.containsWords(message, ['hours', 'time', 'open', 'close', 'working'])) {
      return "Our operating hours:\n🕐 Monday - Friday: 8:00 AM - 6:00 PM\n🕐 Saturday: 9:00 AM - 2:00 PM\n🕐 Sunday: Emergency services only\n\nWe also provide 24/7 emergency support for urgent maritime operations.";
    }

    // Services overview
    if (this.containsWords(message, ['services', 'what do you do', 'offer', 'provide'])) {
      return "Smeedies Maritime offers comprehensive maritime services:\n\n🚢 **Ship Agency**\n• Vessel clearance & documentation\n• Pilot & tug services\n• Port operations\n\n📦 **Freight Forwarding**\n• Container shipping\n• Cargo consolidation\n• Export/import documentation\n\n📋 **Customs Clearing**\n• Import/export documentation\n• HS code classification\n• Duty calculation\n\n🏗️ **Port Operations**\n• Terminal operations\n• Cargo handling\n• Stevedoring services\n\nWhich service interests you most?";
    }

    // Default response
    return "Thank you for your message! I'm here to help with your maritime shipping needs. Could you tell me more about:\n• What type of service you need?\n• Your cargo or vessel details?\n• Your timeline requirements?\n\nOr feel free to ask about our Ship Agency, Freight Forwarding, Customs Clearing, or Port Operations services.";
  }

  // Helper function to check if message contains specific words
  private containsWords(message: string, words: string[]): boolean {
    return words.some(word => message.includes(word));
  }

  // Store chat message in database
  private async storeMessage(sessionId: string, type: 'user' | 'bot', message: string, metadata?: any): Promise<void> {
    try {
      // This would store the message in the database
      // For now, we'll just log it
      console.log(`Chat message stored: ${type} - ${message}`);
      
      // TODO: Implement actual database storage for chat messages
      // await this.storage.storeChatMessage({
      //   sessionId,
      //   type,
      //   message,
      //   metadata,
      //   timestamp: new Date()
      // });
    } catch (error) {
      console.error('Error storing chat message:', error);
    }
  }

  // Get chat session history
  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      // TODO: Implement actual database retrieval
      return [];
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return [];
    }
  }

  // Escalate to human support
  async escalateToHuman(sessionId: string, reason: string): Promise<void> {
    try {
      console.log(`Chat escalated to human support: ${sessionId} - ${reason}`);
      // TODO: Implement escalation logic
    } catch (error) {
      console.error('Error escalating chat:', error);
    }
  }
}
