
import React, { useState } from 'react';
import { CompetitorCard } from './CompetitorCard';
import { type Competitor } from './types';
import { Loader2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface CompetitorListProps {
  competitors: Competitor[];
  isLoading: boolean;
  selectedDistrict: string;
}

export const CompetitorList: React.FC<CompetitorListProps> = ({
  competitors,
  isLoading,
  selectedDistrict,
}) => {
  const [expandedCompetitorId, setExpandedCompetitorId] = useState<string | null>(null);
  const [popoverCompetitor, setPopoverCompetitor] = useState<Competitor | null>(null);
  const { isMobile } = useIsMobile();
  
  // Normalize the district name for "North Miami"
  const normalizedDistrict = selectedDistrict.toLowerCase().includes('north miami') ? 'North Miami' : selectedDistrict;
  
  const handleCompetitorClick = (competitor: Competitor) => {
    if (expandedCompetitorId === competitor.id) {
      setExpandedCompetitorId(null);
    } else {
      setExpandedCompetitorId(competitor.id);
    }
  };
  
  const handleViewDetails = (competitor: Competitor, e: React.MouseEvent) => {
    e.stopPropagation();
    setPopoverCompetitor(competitor);
  };
  
  const handleClosePopover = () => {
    setPopoverCompetitor(null);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="p-3 border rounded-md">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="mt-3">
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-200 mb-2" />
              <div className="flex justify-between mt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (competitors.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
        <div className="mb-3">
          Nessun competitor trovato per questa categoria in {normalizedDistrict}
        </div>
        <div className="text-sm text-muted-foreground">
          Prova a selezionare un altro tipo di business o cambiare distretto
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {competitors.map((competitor, index) => (
        <Collapsible 
          key={`${competitor.id || competitor.name}-${index}`}
          open={expandedCompetitorId === competitor.id}
          onOpenChange={() => handleCompetitorClick(competitor)}
          className="border rounded-md p-0 overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <div className={`p-3 ${expandedCompetitorId === competitor.id ? 'bg-muted/20' : ''}`}>
            <div className="flex justify-between items-start">
              <CollapsibleTrigger className="w-full text-left flex-1">
                <CompetitorCard 
                  competitor={competitor} 
                  isExpanded={expandedCompetitorId === competitor.id}
                  index={index}
                />
              </CollapsibleTrigger>
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleViewDetails(competitor, e)}
                      className="ml-2 text-xs"
                    >
                      Dettagli
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="space-y-2 p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-base">{competitor.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={handleClosePopover}
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
                  </PopoverContent>
                </Popover>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1.5 ml-2 h-8 w-8"
                  >
                    {expandedCompetitorId === competitor.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
          
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Collapsible>
      ))}

      {competitors.length > 0 && (
        <div className="text-center mt-4">
          <Button 
            variant="link" 
            className="text-primary text-sm"
          >
            Visualizza tutti i competitor in {normalizedDistrict}
          </Button>
        </div>
      )}
    </div>
  );
};
