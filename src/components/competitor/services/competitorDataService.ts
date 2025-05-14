
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from '../CompetitorCard';
import { fetchCombinedCompetitorData, analyzeCompetitorReviews } from '@/services/apiService';
import { getDefaultCompetitors } from '../utils/defaultCompetitorsUtil';

/**
 * Service for loading competitor data and performing AI analysis
 */
export const loadCompetitorData = async (
  businessType: BusinessType,
  selectedDistrict: string,
  apiKeys: any,
  cuisineType?: string
): Promise<Competitor[]> => {
  
  // Normalizza il nome del distretto per gestire "North Miami" correttamente
  const normalizedDistrict = selectedDistrict.toLowerCase().includes('north miami') ? 'North Miami' : selectedDistrict;
  
  console.log(`Loading competitor data for ${businessType} in ${normalizedDistrict} ${cuisineType ? `(${cuisineType})` : ''}`);
  
  try {
    // Use the combined data function with normalized district name
    const combinedData = await fetchCombinedCompetitorData(
      businessType, 
      normalizedDistrict,
      apiKeys,
      cuisineType
    );
    
    // Variable to hold the competitor data
    let competitorData: Competitor[] = [];
    
    if (combinedData && combinedData.length > 0) {
      competitorData = combinedData;
      console.log(`Using real competitor data from API: ${combinedData.length} items`);
    } else {
      // Use default data if API returns no results
      competitorData = getDefaultCompetitors(businessType, normalizedDistrict, cuisineType);
      console.log(`Using default competitor data for ${normalizedDistrict}`);
    }
    
    // Get strengths analysis from OpenAI
    console.log(`Analyzing competitor strengths with AI for ${normalizedDistrict}...`);
    
    const strengthsAnalysis = await analyzeCompetitorReviews(
      apiKeys.openAI,
      competitorData,
      businessType,
      normalizedDistrict,
      cuisineType
    );
    
    console.log("Strengths analysis completed:", strengthsAnalysis?.length || 0);
    
    // Merge strengths data with competitor data
    const enhancedCompetitors = competitorData.map(competitor => {
      const strengthsData = strengthsAnalysis.find(item => 
        (item.name && competitor.name && 
        (item.name.toLowerCase().includes(competitor.name.toLowerCase().split(' ')[0]) || 
        competitor.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])))
      );
      
      return {
        ...competitor,
        strengths: strengthsData?.strengths || [],
        district: normalizedDistrict // Aggiungiamo esplicitamente il distretto
      };
    });
    
    console.log(`Enhanced ${enhancedCompetitors.length} competitors with strengths data`);
    return enhancedCompetitors;
  } catch (error) {
    console.error(`Error fetching competitor data for ${normalizedDistrict}:`, error);
    
    // Use default data if there's an error
    return getDefaultCompetitors(businessType, normalizedDistrict, cuisineType);
  }
};
