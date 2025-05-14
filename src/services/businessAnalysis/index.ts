
import { BusinessInfo, AnalysisResult } from './types';
import { collectBusinessData } from './dataCollector';
import { analyzeCompetitors } from './competitorAnalyzer';
import { generateAnalysisPrompt } from './promptGenerator';
import { processAnalysisResponse } from './resultProcessor';
import { fetchOpenAIAnalysis } from '@/services/apiService';

export async function performBusinessAnalysis(
  businessInfo: BusinessInfo,
  apiKeys: Record<string, string>
): Promise<AnalysisResult> {
  console.log(`Starting comprehensive analysis for ${businessInfo.name} at ${businessInfo.address}`);
  
  // Step 1: Collect data from various sources
  const {
    updatedDistrict,
    placesResult,
    yelpResult,
    censusResult,
    trendsResult
  } = await collectBusinessData(businessInfo, apiKeys);
  
  // Step 2: Get specific competitor analysis
  const competitorAnalysis = await analyzeCompetitors(
    apiKeys.openAI,
    yelpResult?.businesses || [],
    businessInfo.type,
    updatedDistrict
  );
  
  // Step 3: Build data object for AI analysis
  const businessData = {
    name: businessInfo.name,
    address: businessInfo.address,
    district: updatedDistrict,
    places: placesResult,
    yelp: yelpResult,
    census: censusResult,
    trends: trendsResult,
    competitors: competitorAnalysis
  };
  
  // Step 4: Generate prompt for OpenAI analysis
  const aiPrompt = generateAnalysisPrompt(
    businessInfo.name,
    businessInfo.address,
    updatedDistrict,
    placesResult,
    censusResult,
    yelpResult,
    trendsResult,
    competitorAnalysis,
    businessInfo.type // Pass businessInfo.type to the prompt generator
  );
  
  console.log(`Sending enhanced strategic business prompt to OpenAI for comprehensive analysis of ${businessInfo.name} in ${updatedDistrict}`);
  
  // Step 5: Get analysis from OpenAI
  const aiAnalysis = await fetchOpenAIAnalysis(apiKeys.openAI, aiPrompt);
  
  // Step 6: Process the OpenAI response
  const parsedAnalysis = processAnalysisResponse(aiAnalysis, businessInfo.name, businessInfo.type, updatedDistrict);
  
  // Step 7: Combine all data into a single object for the results component
  return {
    businessInfo: {
      name: businessInfo.name,
      address: businessInfo.address,
      district: updatedDistrict,
      type: businessInfo.type
    },
    rawData: {
      places: placesResult,
      yelp: yelpResult,
      census: censusResult,
      trends: trendsResult
    },
    analysis: parsedAnalysis
  };
}

// Re-export types for easier imports - fixed to use 'export type' syntax
export type { BusinessInfo, AnalysisResult } from './types';
