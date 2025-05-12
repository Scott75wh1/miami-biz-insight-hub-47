
import { handleApiError } from './handleError';
import { generateMockPlacesData, generateBasicMockData } from './data/mockPlacesData';
import { fetchFromPlacesApi } from './placesApi';
import { apiLogger } from '../logService';

export const fetchPlacesData = async (query: string, apiKey: string, location: string = 'Miami, FL') => {
  const logIndex = apiLogger.logAPICall('Places Service', 'fetchPlacesData', { query, apiKey: apiKey.substring(0, 4) + '...', location });
  
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Google Places API key is not set or using demo key');
    // Return more realistic mock data for demonstration
    const mockData = generateMockPlacesData(query, location);
    apiLogger.logAPIResponse(logIndex, { 
      status: 'MOCK_DATA',
      resultsCount: mockData.results?.length || 0
    });
    return mockData;
  }
  
  try {
    console.log(`Attempting to use real Google Places API with key: ${apiKey.substring(0, 4)}...`);
    console.log(`Query: "${query}", Location: "${location}"`);
    
    // Attempt to use the actual Google Places API
    const apiResponse = await fetchFromPlacesApi(query, apiKey, location);
    
    // If we have a valid response from the API, return it
    if (apiResponse && apiResponse.results) {
      console.log(`Successfully fetched ${apiResponse.results.length} places from Google API`);
      apiLogger.logAPIResponse(logIndex, { 
        status: 'SUCCESS',
        resultsCount: apiResponse.results.length
      });
      return apiResponse;
    }
    
    // If API call fails or isn't implemented, use the basic mock data
    console.log(`Using mock data for query: "${query}" in ${location}`);
    const mockData = generateBasicMockData(query, location);
    apiLogger.logAPIResponse(logIndex, { 
      status: 'FALLBACK_TO_MOCK',
      resultsCount: mockData.results?.length || 0
    });
    return mockData;
  } catch (error) {
    console.error(`Error in Google Places API call:`, error);
    // If there's an error with the real API, fall back to mock data
    console.log(`Falling back to mock data after API error`);
    apiLogger.logAPIError(logIndex, error);
    
    const mockData = generateBasicMockData(query, location);
    return mockData;
  }
};
