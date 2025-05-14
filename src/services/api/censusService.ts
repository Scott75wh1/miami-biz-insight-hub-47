
import { handleApiError } from './handleError';
import { CensusDataResponse } from './census/types';
import { 
  logCensusApiCall, 
  logCensusApiResponse, 
  logCensusApiError,
  fetchRealCensusData,
  getMockDataForLocation
} from './census/apiUtils';

// Re-export the CensusDataResponse interface with the correct 'export type' syntax
export type { CensusDataResponse } from './census/types';

export const fetchCensusData = async (apiKey: string, location: string = 'Miami') => {
  const logIndex = logCensusApiCall('fetchCensusData', { location, apiKey: apiKey ? 'provided' : 'not-provided' });
  console.log(`Fetching census data for location: ${location}`);
  
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Census.gov API key is not set or using demo key');
    // Return mock data for demonstration
    const mockData = getMockDataForLocation(location);
    logCensusApiResponse(logIndex, { status: 'MOCK_DATA', data: mockData });
    return mockData;
  }
  
  try {
    const data = await fetchRealCensusData(apiKey, location);
    logCensusApiResponse(logIndex, { status: 'SUCCESS', data });
    return data;
  } catch (error) {
    console.error('Error with Census API call, using mock data instead:', error);
    logCensusApiError(logIndex, { status: 'API_ERROR', error });
    
    // Fall back to mock data if API call fails
    const mockData = getMockDataForLocation(location);
    return mockData;
  }
};

export const fetchDistrictCensusData = async (apiKey: string, district: string): Promise<CensusDataResponse> => {
  const logIndex = logCensusApiCall('fetchDistrictCensusData', { district, apiKey: apiKey ? 'provided' : 'not-provided' });
  console.log(`Fetching district census data for: ${district}`);
  
  try {
    // In a real implementation, we would make specific API calls for each district
    // For now, we'll use our mock data
    const data = getMockDataForLocation(district);
    logCensusApiResponse(logIndex, { status: 'MOCK_DATA', data });
    return data;
  } catch (error) {
    logCensusApiError(logIndex, { status: 'GENERAL_ERROR', error });
    return handleApiError(error, 'Census.gov');
  }
};
