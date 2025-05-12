
import React from 'react';
import { Star, MapPin, MessageSquare } from 'lucide-react';

export interface Competitor {
  name: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  sentiments?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  yelpMatch?: boolean;
  reviewHighlight?: string | null;
}

interface CompetitorCardProps {
  competitor: Competitor;
}

export const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor }) => {
  return (
    <div className="p-3 border rounded-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{competitor.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{competitor.type}</span>
            <span className="mx-1">·</span>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{competitor.location}</span>
            </div>
            <span className="mx-1">·</span>
            <span>{competitor.priceLevel}</span>
            {competitor.yelpMatch && (
              <>
                <span className="mx-1">·</span>
                <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded">Yelp</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md text-sm">
          <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
          <span className="font-medium">{competitor.rating.toFixed(1)}</span>
          <span className="text-muted-foreground text-xs ml-1">({competitor.reviews})</span>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-xs font-medium mt-2 mb-1">Sentimento Recensioni</div>
        <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-200">
          {competitor.sentiments && (
            <>
              <div className="bg-green-500 h-full" style={{ width: `${competitor.sentiments.positive}%` }}></div>
              <div className="bg-yellow-500 h-full" style={{ width: `${competitor.sentiments.neutral}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${competitor.sentiments.negative}%` }}></div>
            </>
          )}
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>{competitor.sentiments?.positive || 0}% Positivo</span>
          <span>{competitor.sentiments?.neutral || 0}% Neutro</span>
          <span>{competitor.sentiments?.negative || 0}% Negativo</span>
        </div>
        
        {competitor.reviewHighlight && (
          <div className="mt-2 text-xs bg-muted/30 p-2 rounded-md">
            <div className="flex items-start">
              <MessageSquare className="h-3 w-3 mr-1 mt-0.5 text-muted-foreground" />
              <span className="text-muted-foreground italic">"{competitor.reviewHighlight}"</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
