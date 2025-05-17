
import React from 'react';
import { Star, MapPin, MessageSquare, Award } from 'lucide-react';
import { Competitor as CompetitorType } from './types';

// Local interface extending the imported type to ensure location is required
export interface Competitor extends CompetitorType {
  location: string;
}

interface CompetitorCardProps {
  competitor: Competitor;
  isExpanded?: boolean;
}

export const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, isExpanded = false }) => {
  return (
    <div className={`w-full ${isExpanded ? 'pb-2' : ''}`}>
      <div>
        <h3 className="font-medium text-base">{competitor.name}</h3>
        <div className="flex flex-wrap gap-1 items-center text-sm text-muted-foreground">
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
      
      <div className="mt-2">
        <div className="text-xs font-medium mt-2 mb-1 flex justify-between items-center">
          <span>Sentimento Recensioni</span>
          <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md text-xs">
            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="font-medium">{competitor.rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-xs ml-1">({competitor.reviews})</span>
          </div>
        </div>
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
        
        {!isExpanded && competitor.strengths && competitor.strengths.length > 0 && (
          <div className="mt-2">
            <div className="text-xs font-medium mb-1 flex items-center">
              <Award className="h-3.5 w-3.5 mr-1 text-amber-500" />
              Punti di Forza
            </div>
            <div className="flex flex-wrap gap-1">
              {competitor.strengths.slice(0, 3).map((strength, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full border border-amber-100"
                >
                  {strength}
                </span>
              ))}
              {competitor.strengths.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full">
                  +{competitor.strengths.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
        
        {!isExpanded && competitor.reviewHighlight && (
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
