
// Proxy service to handle CORS issues with external APIs

/**
 * Creates a proxy URL for making API calls to avoid CORS issues
 * @param apiUrl The original API URL to call
 * @returns The proxied URL
 */
export const createProxyUrl = (apiUrl: string): string => {
  // In a production environment, you would use a real backend proxy
  // For now, we'll use a service like CORS Anywhere or AllOrigins
  // Note: These services may have limitations and are not suitable for production
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
};

/**
 * Makes a proxied API call
 * @param apiUrl The original API URL to call
 * @returns The API response
 */
export const fetchWithProxy = async (apiUrl: string, options: RequestInit = {}) => {
  const proxyUrl = createProxyUrl(apiUrl);
  
  try {
    const response = await fetch(proxyUrl, options);
    
    if (!response.ok) {
      throw new Error(`Proxy API returned status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching through proxy:', error);
    throw error;
  }
};
