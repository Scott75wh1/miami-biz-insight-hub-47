
// Main API service file that exports all API functions
import { handleApiError } from './api/handleError';
import { fetchPlacesData } from './api/placesService';
import { fetchCensusData, fetchDistrictCensusData } from './api/censusService';
import { fetchYelpData } from './api/yelpService';
import { fetchGoogleTrendsData } from './api/trendsService';
import { fetchOpenAIAnalysis, analyzeCompetitorReviews, analyzeTrendsData } from './api/openaiService';
import { fetchCombinedCompetitorData } from './api/competitorService';

// Import and re-export types with 'export type' syntax
import type { CensusDataResponse } from './api/censusService';

// Re-export all API functions
export {
  handleApiError,
  fetchPlacesData,
  fetchCensusData,
  fetchDistrictCensusData,
  fetchYelpData,
  fetchGoogleTrendsData,
  fetchOpenAIAnalysis,
  analyzeCompetitorReviews,
  analyzeTrendsData,
  fetchCombinedCompetitorData,
};

// Re-export types using 'export type'
export type { CensusDataResponse };
