
// Re-export the types from utils to maintain consistency
import type { TrendItem, Category } from './utils';

export type { TrendItem, Category };

export interface AIRecommendation {
  summary: string;
  recommendations: string[];
}

export interface TrendsContextType {
  searchTrends: TrendItem[];
  growingCategories: Category[];
  aiRecommendations: AIRecommendation;
  isLoading: boolean;
  isAiLoading: boolean;
  isUsingDemoKey: boolean;
  fetchTrendsData: (businessType: string | import('@/components/BusinessTypeSelector').BusinessType, district: string) => Promise<void>;
}
