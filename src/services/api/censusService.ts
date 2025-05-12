
import { handleApiError } from './handleError';
import { fetchWithProxy } from './proxyService';
import { apiLogger } from '../logService';

export const fetchCensusData = async (apiKey: string, location: string = 'Miami') => {
  const logIndex = apiLogger.logAPICall('Census.gov API', 'fetchCensusData', { location, apiKey: apiKey ? 'provided' : 'not-provided' });
  
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Census.gov API key is not set or using demo key');
    // Return mock data for demonstration
    const mockData = {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
    apiLogger.logAPIResponse(logIndex, { status: 'MOCK_DATA', data: mockData });
    return mockData;
  }
  
  try {
    console.log(`Attempting to fetch real census data for: ${location}`);
    
    // Get the state and county from location (basic implementation)
    const state = 'FL'; // Florida for Miami
    const county = 'Miami-Dade County';
    
    // Example Census API call for American Community Survey data
    // This is a simplified example - real implementation would need proper Census API endpoints
    const url = `https://api.census.gov/data/2019/acs/acs5?get=B01003_001E,B01002_001E,B19013_001E,B11001_001E&for=county:${county}&in=state:${state}&key=${apiKey}`;
    
    try {
      const data = await fetchWithProxy(url);
      apiLogger.logAPIResponse(logIndex, { status: 'SUCCESS', data });
      
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
        apiLogger.logAPIError(logIndex, { status: 'INVALID_FORMAT', error: error.message, response: data });
        throw error;
      }
    } catch (error) {
      console.error('Error with Census API call, using mock data instead:', error);
      apiLogger.logAPIError(logIndex, { status: 'API_ERROR', error });
      
      // Fall back to mock data if API call fails
      return {
        population: 442241,
        median_age: 40.1,
        median_income: 44268,
        households: 186860
      };
    }
  } catch (error) {
    apiLogger.logAPIError(logIndex, { status: 'GENERAL_ERROR', error });
    return handleApiError(error, 'Census.gov');
  }
};
