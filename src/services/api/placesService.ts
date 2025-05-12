
import { handleApiError } from './handleError';
import { generateMockPlacesData, generateBasicMockData } from './data/mockPlacesData';
import { fetchFromPlacesApi } from './placesApi';

export const fetchPlacesData = async (query: string, apiKey: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Google Places API key is not set or using demo key');
    // Return more realistic mock data for demonstration
    return generateMockPlacesData(query, location);
  }
  
  try {
    // Attempt to use the actual Google Places API
    const apiResponse = await fetchFromPlacesApi(query, apiKey, location);
    
    // If we have a valid response from the API, return it
    if (apiResponse) {
      return apiResponse;
    }
    
    // If API call fails or isn't implemented, use the basic mock data
    console.log(`Using mock data for query: "${query}" in ${location}`);
    return generateBasicMockData(query, location);
  } catch (error) {
    return handleApiError(error, 'Google Places');
  }
};
