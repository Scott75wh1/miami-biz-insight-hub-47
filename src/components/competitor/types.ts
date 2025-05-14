
// Define types for competitor data
export interface Competitor {
  id?: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  reviewCount?: number;
  reviews?: number;
  priceLevel: string;
  strengths?: string[];
  sentiments: {
    positive: number;
    neutral: number;
    negative: number;
  };
  reviewHighlight?: string | null;
  district?: string;
}

export interface CompetitorResponse {
  businesses: Competitor[];
}
