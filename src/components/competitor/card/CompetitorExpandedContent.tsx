
import React from 'react';
import { type Competitor } from '../types';

interface CompetitorExpandedContentProps {
  competitor: Competitor;
}

export const CompetitorExpandedContent: React.FC<CompetitorExpandedContentProps> = ({ competitor }) => {
  return (
    <div className="p-3 pt-0 border-t bg-muted/10">
      <div className="space-y-3 pt-3">
        {competitor.strengths && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Punti di Forza</h4>
            <div className="flex flex-wrap gap-1">
              {competitor.strengths.map((strength, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-2 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-100"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {competitor.reviewHighlight && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Recensione in evidenza</h4>
            <div className="text-sm bg-muted/30 p-2 rounded-md italic">
              "{competitor.reviewHighlight}"
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Informazioni Aggiuntive</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-muted/30 rounded-md">
              <span className="text-xs text-muted-foreground block">Località</span>
              <span>{typeof competitor.location === 'string' ? competitor.location : competitor.location?.address1 || 'Non disponibile'}</span>
            </div>
            <div className="p-2 bg-muted/30 rounded-md">
              <span className="text-xs text-muted-foreground block">Categoria</span>
              <span>{competitor.type}</span>
            </div>
            <div className="p-2 bg-muted/30 rounded-md">
              <span className="text-xs text-muted-foreground block">Fascia di prezzo</span>
              <span>{competitor.priceLevel}</span>
            </div>
            <div className="p-2 bg-muted/30 rounded-md">
              <span className="text-xs text-muted-foreground block">Fonte dati</span>
              <span>{competitor.yelpMatch ? 'Google & Yelp' : 'Google Places'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
