// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  // In development, use the local server
  if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  
  // In production, use relative URL which will be handled by Vercel
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();
