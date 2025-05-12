
// API utility functions for Google Places API
import { apiLogger } from '../logService';

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
    
    // Use a proxy to avoid CORS issues in the browser
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    
    // Make the actual API call
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Google Places API returned status: ${response.status}, body: ${errorText}`);
      apiLogger.logAPIError(logIndex, { status: response.status, error: errorText });
      throw error;
    }
    
    const data = await response.json();
    apiLogger.logAPIResponse(logIndex, data);
    
    return data;
  } catch (error) {
    console.error('Error fetching from Google Places API:', error);
    apiLogger.logAPIError(logIndex, error);
    throw error;
  }
};
