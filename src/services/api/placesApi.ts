
// API utility functions for Google Places API
import { apiLogger } from '../logService';
import { fetchWithProxy } from './proxyService';

export const fetchFromPlacesApi = async (query: string, apiKey: string, location: string) => {
  const logIndex = apiLogger.logAPICall('Google Places API', 'textSearch', { query, location });
  
  // Skip real API call if using demo key
  if (!apiKey || apiKey === 'demo-key') {
    apiLogger.logAPIResponse(logIndex, {
      status: 'MOCKED',
      message: 'Using mock data (API key not provided)'
    });
    return null;
  }
  
  try {
    console.log(`Making real API call to Google Places API for: ${query} in ${location}`);
    
    // Build the actual Google Places API URL with radius parameter (2 miles = 3219 meters)
    const radius = 3219; // 2 miles in meters
    
    // We're using textSearch which can handle natural language queries like "restaurants near [address]"
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&location=${encodeURIComponent(location)}&radius=${radius}`;
    
    // Use the fetchWithProxy utility instead of direct fetch with a proxy URL
    const data = await fetchWithProxy(url);
    
    if (!data) {
      const error = new Error('No data returned from Google Places API');
      apiLogger.logAPIError(logIndex, { status: 'NO_DATA', error: error.message });
      throw error;
    }
    
    apiLogger.logAPIResponse(logIndex, data);
    return data;
  } catch (error) {
    console.error('Error fetching from Google Places API:', error);
    apiLogger.logAPIError(logIndex, error);
    throw error;
  }
};
