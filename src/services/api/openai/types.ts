
// Types for OpenAI service
export interface OpenAIResponse {
  choices?: {
    message: {
      content: string;
    };
  }[];
  error?: boolean;
  errorType?: string;
  service?: string;
  message?: string;
  timestamp?: string;
  usingMockData?: boolean;
}

export interface CompetitorStrength {
  name: string;
  strengths: string[];
}

export interface TrendsAnalysis {
  summary: string;
  recommendations: string[];
}

// Added this interface to ensure consistency across the application
export interface BusinessAnalysis {
  summary: string;
  demographicAnalysis: string;
  competitionAnalysis: string;
  trendsAnalysis: string;
  recommendedKeywords?: string[];
  marketOpportunities?: string; // This is a string, not string[]
  consumerProfile?: string;
  localHighlights?: string;
  recommendations: string[];
}

// Updated to include trends property for consistency with TrendsDataResponse
export interface ApiErrorResponse {
  error: boolean;
  errorType: string;
  service: string;
  message: string;
  timestamp: string;
  usingMockData: boolean;
  trends?: any[]; // Added trends property to match TrendsDataResponse
  district?: string; // Added district property to match TrendsDataResponse
}
