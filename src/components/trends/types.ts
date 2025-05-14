
export interface TrendItem {
  label: string;
  value: number;
}

export interface Category {
  name: string;
  growth: string;
  color: string;
}

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
  fetchTrendsData: (businessType: string, district: string) => Promise<void>;
}
