
import { handleApiError } from './handleError';
import { generateMockPlacesData, generateBasicMockData } from './data/mockPlacesData';
import { fetchFromPlacesApi } from './placesApi';
import { fetchWithProxy } from './proxyService';

export const fetchPlacesData = async (query: string, apiKey: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Google Places API key is not set or using demo key');
    // Return more realistic mock data for demonstration
    return generateMockPlacesData(query, location);
  }
  
  try {
    console.log(`Attempting to use real Google Places API with key: ${apiKey.substring(0, 4)}...`);
    console.log(`Query: "${query}", Location: "${location}"`);
    
    // Attempt to use the actual Google Places API
    const apiResponse = await fetchFromPlacesApi(query, apiKey, location);
    
    // If we have a valid response from the API, return it
    if (apiResponse && apiResponse.results) {
      console.log(`Successfully fetched ${apiResponse.results.length} places from Google API`);
      return apiResponse;
    }
    
    // If API call fails or isn't implemented, use the basic mock data
    console.log(`Using mock data for query: "${query}" in ${location}`);
    return generateBasicMockData(query, location);
  } catch (error) {
    console.error(`Error in Google Places API call:`, error);
    // If there's an error with the real API, fall back to mock data
    console.log(`Falling back to mock data after API error`);
    return generateBasicMockData(query, location);
  }
};
