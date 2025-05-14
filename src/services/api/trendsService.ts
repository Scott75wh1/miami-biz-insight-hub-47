
import { handleApiError } from './handleError';
import { ApiErrorResponse } from './openai/types';

export interface TrendsDataResponse {
  trends: { keyword: string; value: number; formattedTime: string }[];
  district: string;
}

export const fetchGoogleTrendsData = async (apiKey: string, keywords: string[], geo: string = 'US-FL-528', district: string = 'Miami Beach'): Promise<TrendsDataResponse | ApiErrorResponse> => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Google Trends API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      trends: keywords.map((keyword, index) => ({
        keyword,
        value: 100 - (index * 15), // Just a mock decreasing value
        formattedTime: 'Last 12 months'
      })),
      district: district
    };
  }
  
  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    console.error('Invalid keywords parameter for Google Trends');
    return {
      trends: [],
      district: district
    };
  }
  
  try {
    // In a real implementation, we would use the actual Google Trends API
    console.log(`Fetching Google Trends data for keywords: ${keywords.join(', ')} in ${geo}, district: ${district}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Google Trends API
    return {
      trends: keywords.map((keyword, index) => ({
        keyword,
        value: 100 - (index * 15 + (district === 'Wynwood' ? 5 : district === 'Brickell' ? 3 : 0)), // Mock data with district variation
        formattedTime: 'Last 12 months'
      })),
      district: district
    };
  } catch (error) {
    const errorResponse = handleApiError(error, 'Google Trends') as ApiErrorResponse;
    // Add an empty trends array to match the expected structure
    return {
      ...errorResponse,
      trends: [],
      district: district
    };
  }
};
