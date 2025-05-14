export interface Competitor {
  id: string;
  name: string;
  type: string;
  location: string;
  priceLevel: string;
  rating: number;
  reviews: number;
  sentiments: {
    positive: number;
    neutral: number;
    negative: number;
  };
  yelpMatch?: boolean;
  strengths?: string[];
  reviewHighlight?: string;
}
