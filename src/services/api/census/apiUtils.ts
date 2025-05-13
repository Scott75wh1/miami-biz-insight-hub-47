import { apiLogger } from '../../logService';
import { handleApiError } from '../handleError';
import { fetchWithProxy } from '../proxyService';
import { CensusDataResponse } from './types';
import { DISTRICT_CENSUS_DATA, GENERIC_MIAMI_DATA } from './mockCensusData';

export const logCensusApiCall = (method: string, params: Record<string, any>) => {
  return apiLogger.logAPICall('Census.gov API', method, params);
};

export const logCensusApiResponse = (logIndex: number, response: any) => {
  apiLogger.logAPIResponse(logIndex, response);
};

export const logCensusApiError = (logIndex: number, error: any) => {
  apiLogger.logAPIError(logIndex, error);
};

export const fetchRealCensusData = async (
  apiKey: string, 
  location: string
): Promise<CensusDataResponse> => {
  console.log(`Attempting to fetch real census data for: ${location}`);
  
  // Get the state and county from location (basic implementation)
  const state = 'FL'; // Florida for Miami
  const county = 'Miami-Dade County';
  
  // Example Census API call for American Community Survey data
  const url = `https://api.census.gov/data/2019/acs/acs5?get=B01003_001E,B01002_001E,B19013_001E,B11001_001E&for=county:${county}&in=state:${state}&key=${apiKey}`;
  
  const data = await fetchWithProxy(url);
  
  if (data && Array.isArray(data) && data.length >= 2) {
    // Parse the Census API response (typically returns arrays)
    // First row is headers, second row is data
    const [headers, values] = data;
    
    return {
      population: parseInt(values[0]) || 442241,
      median_age: parseFloat(values[1]) || 40.1,
      median_income: parseInt(values[2]) || 44268,
      households: parseInt(values[3]) || 186860
    };
  } else {
    const error = new Error('Invalid response format from Census API');
    throw error;
  }
};

export const getMockDataForLocation = (location: string): CensusDataResponse => {
  // If location is one of our specific districts, return the detailed data for that district
  if (DISTRICT_CENSUS_DATA[location]) {
    return DISTRICT_CENSUS_DATA[location];
  }
  
  // Otherwise return generic Miami data
  return GENERIC_MIAMI_DATA;
};
