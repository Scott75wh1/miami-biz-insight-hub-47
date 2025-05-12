
// Main API service file that exports all API functions
import { handleApiError } from './api/handleError';
import { fetchPlacesData } from './api/placesService';
import { fetchCensusData } from './api/censusService';
import { fetchYelpData } from './api/yelpService';
import { fetchGoogleTrendsData } from './api/trendsService';
import { fetchOpenAIAnalysis, analyzeCompetitorReviews } from './api/openaiService';
import { fetchCombinedCompetitorData } from './api/competitorService';

// Re-export all API functions
export {
  handleApiError,
  fetchPlacesData,
  fetchCensusData,
  fetchYelpData,
  fetchGoogleTrendsData,
  fetchOpenAIAnalysis,
  analyzeCompetitorReviews,
  fetchCombinedCompetitorData
};
