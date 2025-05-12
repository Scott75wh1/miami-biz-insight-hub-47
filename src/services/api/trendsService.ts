
import { handleApiError } from './handleError';

export const fetchGoogleTrendsData = async (apiKey: string, keywords: string[], geo: string = 'US-FL-528') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Google Trends API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      trends: keywords.map((keyword, index) => ({
        keyword,
        value: 100 - (index * 15), // Just a mock decreasing value
        formattedTime: 'Last 12 months'
      }))
    };
  }
  
  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    console.error('Invalid keywords parameter for Google Trends');
    return null;
  }
  
  try {
    // In a real implementation, we would use the actual Google Trends API
    console.log(`Fetching Google Trends data for keywords: ${keywords.join(', ')} in ${geo}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Google Trends API
    return {
      trends: keywords.map((keyword, index) => ({
        keyword,
        value: 100 - (index * 15), // Just a mock decreasing value
        formattedTime: 'Last 12 months'
      }))
    };
  } catch (error) {
    return handleApiError(error, 'Google Trends');
  }
};
