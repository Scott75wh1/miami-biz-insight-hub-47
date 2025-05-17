
export interface Competitor {
  id: string;
  name: string;
  type: string;
  location: string | { address1?: string };
  priceLevel: string;
  rating: number;
  reviews: number;
  review_count?: number; // For backwards compatibility
  price?: string; // For price display
  sentiments: {
    positive: number;
    neutral: number;
    negative: number;
  };
  yelpMatch?: boolean;
  strengths?: string[];
  weaknesses?: string[];
  reviewHighlight?: string;
  competitiveAdvantage?: string;
  marketPosition?: string;
  category?: string | string[];
  url?: string;
  // Define reviews array as a separate property with a different name to avoid conflicts
  reviewsData?: Array<{ rating: number; text: string }>;
}
