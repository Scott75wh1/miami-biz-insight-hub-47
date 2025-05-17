
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { type Competitor } from '../types';

interface CompetitorPopoverContentProps { 
  competitor: Competitor; 
  onClose: (competitor: Competitor, e: React.MouseEvent) => void;
}

export const CompetitorPopoverContent: React.FC<CompetitorPopoverContentProps> = ({ 
  competitor, 
  onClose 
}) => {
  return (
    <div className="space-y-2 p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-base">{competitor.name}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={(e) => onClose(competitor, e)}
        >
          <X size={16} />
        </Button>
      </div>
      
      <div className="p-3 bg-muted/20 rounded-md">
        <h4 className="text-sm font-medium mb-1">Informazioni</h4>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-muted-foreground">Tipo:</div>
          <div>{competitor.type}</div>
          <div className="text-muted-foreground">Località:</div>
          <div>{typeof competitor.location === 'string' ? competitor.location : competitor.location?.address1 || 'Non disponibile'}</div>
          <div className="text-muted-foreground">Prezzo:</div>
          <div>{competitor.priceLevel}</div>
          <div className="text-muted-foreground">Valutazione:</div>
          <div className="flex items-center">
            <span className="mr-1">{competitor.rating.toFixed(1)}</span>
            <span className="text-xs">({competitor.reviews || 0} recensioni)</span>
          </div>
        </div>
      </div>
      
      {competitor.strengths && (
        <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
          <h4 className="text-sm font-medium mb-1">Punti di Forza</h4>
          <ul className="list-disc pl-4 text-sm">
            {competitor.strengths.map((strength, idx) => (
              <li key={idx}>{strength}</li>
            ))}
          </ul>
        </div>
      )}
      
      {competitor.reviewHighlight && (
        <div className="p-3 bg-primary/5 rounded-md border border-primary/10">
          <h4 className="text-sm font-medium mb-1">Recensione in evidenza</h4>
          <p className="text-sm italic">"{competitor.reviewHighlight}"</p>
        </div>
      )}
      
      <div className="pt-2">
        <h4 className="text-sm font-medium mb-1">Sentimento Recensioni</h4>
        <div className="flex h-2 w-full rounded-full overflow-hidden bg-gray-200">
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
      </div>
    </div>
  );
};
