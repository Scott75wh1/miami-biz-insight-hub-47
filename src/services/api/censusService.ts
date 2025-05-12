
import { handleApiError } from './handleError';

export const fetchCensusData = async (apiKey: string, location: string = 'Miami') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Census.gov API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
  }
  
  try {
    // In a real implementation, we would use the actual Census.gov API
    console.log(`Fetching census data for: ${location}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Census.gov API
    return {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
  } catch (error) {
    return handleApiError(error, 'Census.gov');
  }
};
