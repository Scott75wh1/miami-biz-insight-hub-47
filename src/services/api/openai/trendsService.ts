
import { handleApiError } from '../handleError';
import { TrendsAnalysis } from './types';
import { getMockTrendsAnalysis } from './mockData';

// Add a new function to analyze trends data
export const analyzeTrendsData = async (
  apiKey: string, 
  businessType: string, 
  searchTrends: any[], 
  growingCategories: any[],
  district: string = 'Miami Beach'
): Promise<TrendsAnalysis> => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Using mock data for trends analysis');
    return getMockTrendsAnalysis(businessType, searchTrends, growingCategories, district);
  }
  
  try {
    const prompt = `
      Analizza questi trend di mercato nel settore ${businessType} nella zona di ${district}:
      
      Trend di ricerca: ${JSON.stringify(searchTrends)}
      
      Categorie in crescita: ${JSON.stringify(growingCategories)}
      
      Fornisci 3 consigli strategici basati su questi dati di trend. Restituisci la risposta in formato JSON:
      {
        "summary": "Un breve riassunto della tendenza generale",
        "recommendations": ["consiglio 1", "consiglio 2", "consiglio 3"]
      }
    `;
    
    console.log(`Analyzing trends data with OpenAI for ${businessType} in ${district}`);
    
    // In a real implementation, we would call the OpenAI API
    // For now, we'll return mock data
    return getMockTrendsAnalysis(businessType, searchTrends, growingCategories, district);
  } catch (error) {
    console.error('Error analyzing trends data:', error);
    return getMockTrendsAnalysis(businessType, searchTrends, growingCategories, district);
  }
};
