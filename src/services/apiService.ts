
// Main API service file that exports all API functions
import { handleApiError } from './api/handleError';
import { fetchPlacesData } from './api/placesService';
import { fetchCensusData, fetchDistrictCensusData } from './api/censusService';
import { fetchYelpData } from './api/yelpService';
import { fetchGoogleTrendsData } from './api/trendsService';
import { fetchOpenAIAnalysis, analyzeCompetitorReviews, analyzeTrendsData } from './api/openai';
import { fetchCombinedCompetitorData } from './api/competitorService';
import { fetchTrafficData } from './api/traffic/trafficService';

// Import and re-export types with 'export type' syntax
import type { CensusDataResponse } from './api/censusService';
import type { CompetitorStrength, TrendsAnalysis } from './api/openai';

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
  fetchTrafficData,
};

// Re-export types using 'export type'
export type { CensusDataResponse, CompetitorStrength, TrendsAnalysis };
