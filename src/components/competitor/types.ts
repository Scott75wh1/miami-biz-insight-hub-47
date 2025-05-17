
export interface Competitor {
  id: string;
  name: string;
  type: string;
  location: string | { address1?: string };
  priceLevel: string;
  rating: number;
  reviews: number;
  review_count?: number; // Added for backwards compatibility
  price?: string; // Added for price display
  sentiments: {
    positive: number;
    neutral: number;
    negative: number;
  };
  yelpMatch?: boolean;
  strengths?: string[];
  weaknesses?: string[]; // Added for weakness analysis
  reviewHighlight?: string;
  competitiveAdvantage?: string; // Added for competitive analysis
  marketPosition?: string; // Added for market positioning
  category?: string | string[]; // Added for business categories
  url?: string; // Added for external links
  reviews?: Array<{ rating: number; text: string }>; // Added for detailed reviews
}

// Export using 'export type' to avoid conflicts with 'isolatedModules'
export type { Competitor };
