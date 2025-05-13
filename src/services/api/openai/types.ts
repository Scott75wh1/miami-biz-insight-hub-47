
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
