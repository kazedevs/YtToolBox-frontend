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
  
  // In production, use the deployed backend server
  return 'https://yttoolbox-backend.vercel.app';
};

export const API_BASE_URL = getApiBaseUrl();
