
// Types for OpenAI service
export interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
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
