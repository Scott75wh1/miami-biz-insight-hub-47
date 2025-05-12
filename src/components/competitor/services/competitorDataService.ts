
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
  
  console.log(`Loading competitor data for ${businessType} in ${selectedDistrict} ${cuisineType ? `(${cuisineType})` : ''}`);
  
  try {
    // Use the combined data function
    const combinedData = await fetchCombinedCompetitorData(
      businessType, 
      selectedDistrict, 
      apiKeys,
      cuisineType
    );
    
    // Variable to hold the competitor data
    let competitorData: Competitor[] = [];
    
    if (combinedData && combinedData.length > 0) {
      competitorData = combinedData;
      console.log("Using real competitor data from API");
    } else {
      // Use default data if API returns no results
      competitorData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
      console.log("Using default competitor data");
    }
    
    // Get strengths analysis from OpenAI
    console.log("Analyzing competitor strengths with AI...");
    
    const strengthsAnalysis = await analyzeCompetitorReviews(
      apiKeys.openAI,
      competitorData,
      businessType,
      selectedDistrict,
      cuisineType
    );
    
    console.log("Strengths analysis:", strengthsAnalysis);
    
    // Merge strengths data with competitor data
    const enhancedCompetitors = competitorData.map(competitor => {
      const strengthsData = strengthsAnalysis.find(item => 
        item.name.toLowerCase().includes(competitor.name.toLowerCase().split(' ')[0]) || 
        competitor.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
      );
      
      return {
        ...competitor,
        strengths: strengthsData?.strengths || []
      };
    });
    
    return enhancedCompetitors;
  } catch (error) {
    console.error('Error fetching competitor data:', error);
    
    // Use default data if there's an error
    return getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
  }
};
