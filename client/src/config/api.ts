/**
 * API Configuration for different environments
 */

// API Gateway base URL for production
const API_GATEWAY_BASE_URL = 'https://lqfflhnotf.execute-api.us-east-1.amazonaws.com/prod';

// Get API base URL based on environment
export const getApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return API_GATEWAY_BASE_URL;
  }
  // Development - use local server on same port
  return '';
};

// API endpoints
export const API_ENDPOINTS = {
  CHATBOT: '/api/chatbot/message',
  CONTACT: '/api/contact',
  ADMIN: '/api/admin',
  HEALTH: '/api/health',
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: keyof typeof API_ENDPOINTS): string => {
  return `${getApiBaseUrl()}${API_ENDPOINTS[endpoint]}`;
};
