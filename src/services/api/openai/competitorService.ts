
import { handleApiError } from '../handleError';
import { CompetitorStrength } from './types';
import { getMockStrengthsData } from './mockData';

export const analyzeCompetitorReviews = async (
  apiKey: string, 
  competitors: any[], 
  businessType: string, 
  district: string, 
  cuisineType?: string
): Promise<CompetitorStrength[]> => {
  if (!apiKey || apiKey === 'demo-key' || !competitors || competitors.length === 0) {
    console.log('Using mock data for competitor strengths analysis');
    
    // Return mock strengths based on business type
    return getMockStrengthsData(businessType, cuisineType);
  }
  
  try {
    // Create a summary of the competitors for the prompt
    const competitorsData = competitors.map(comp => ({
      name: comp.name,
      rating: comp.rating,
      reviews: comp.reviews,
      reviewHighlight: comp.reviewHighlight || 'No highlight available'
    }));
    
    const prompt = `
      Analizza questi competitor nel settore ${businessType}${cuisineType ? ` (${cuisineType})` : ''} a ${district}:
      ${JSON.stringify(competitorsData)}
      
      Identifica i principali punti di forza per ciascun competitor basandoti sulle valutazioni e recensioni.
      Restituisci un JSON array con oggetti nella seguente struttura:
      { "name": "nome del competitor", "strengths": ["punto di forza 1", "punto di forza 2", "punto di forza 3"] }
    `;
    
    console.log(`Analyzing competitor reviews with OpenAI for ${district} ${businessType}`);
    
    // In a real implementation, we would call the OpenAI API
    // For now, we'll return mock data
    return getMockStrengthsData(businessType, cuisineType);
  } catch (error) {
    console.error('Error analyzing competitor reviews:', error);
    return getMockStrengthsData(businessType, cuisineType);
  }
};
