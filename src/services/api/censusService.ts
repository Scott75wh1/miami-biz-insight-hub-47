
import { handleApiError } from './handleError';
import { fetchWithProxy } from './proxyService';

export const fetchCensusData = async (apiKey: string, location: string = 'Miami') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Census.gov API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
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
        throw new Error('Invalid response format from Census API');
      }
    } catch (error) {
      console.error('Error with Census API call, using mock data instead:', error);
      // Fall back to mock data if API call fails
      return {
        population: 442241,
        median_age: 40.1,
        median_income: 44268,
        households: 186860
      };
    }
  } catch (error) {
    return handleApiError(error, 'Census.gov');
  }
};
