// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  // Check if we're in development environment
  const isDev = process.env.NODE_ENV === 'development' || 
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1';
  
  // In development, use the local server
  if (isDev) {
    return 'http://localhost:5000';
  }
  
  // In production, use the same origin with /api prefix
  // This ensures the API routes work correctly with Vercel
  return window.location.origin;
};

export const API_BASE_URL = getApiBaseUrl();
