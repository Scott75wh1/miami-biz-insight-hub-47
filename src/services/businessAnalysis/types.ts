
import { BusinessAnalysis } from '@/services/api/openai/types';

export interface BusinessInfo {
  name: string;
  address: string;
  district: string;
  type: string;
}

export interface AnalysisResult {
  businessInfo: BusinessInfo;
  rawData: {
    places: any;
    yelp: any;
    census: any;
    trends: any;
  };
  analysis: BusinessAnalysis;
}
