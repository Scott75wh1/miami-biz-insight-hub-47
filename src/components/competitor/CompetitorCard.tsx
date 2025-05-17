
import React, { useState } from 'react';
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, MapPin, Info, ChevronDown, ChevronUp,
  ExternalLink, ThumbsUp, AlertCircle
} from 'lucide-react';
import { Competitor } from './types';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useUserType } from '@/hooks/useUserType';

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

export const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userType } = useUserType();
  const isPro = userType === 'marketer';
  
  // Creiamo un colore dinamico basato sul rating
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3.5) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const ratingColor = getRatingColor(competitor.rating);
  
  // Formatta l'indirizzo per la visualizzazione
  const formattedAddress = competitor.location?.address1 || 'Indirizzo non disponibile';
  
  return (
    <>
      <Card className="mb-3 transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base flex items-center">
                <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded mr-2">
                  {index + 1}
                </span>
                {competitor.name}
              </CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {formattedAddress}
              </CardDescription>
            </div>
            
            <div className="flex flex-col items-end">
              <div className={`flex items-center ${ratingColor} font-medium`}>
                <Star className="h-3 w-3 mr-1 fill-current" />
                <span>{competitor.rating}</span>
                <span className="text-muted-foreground text-xs ml-1">
                  ({competitor.review_count || 0})
                </span>
              </div>
              
              {isPro && competitor.price && (
                <Badge variant="outline" className="mt-1">
                  {competitor.price}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        {expanded && (
          <CardContent className="pt-0 pb-2">
            {isPro ? (
              <>
                {competitor.strengths && competitor.strengths.length > 0 && (
                  <div className="mt-2">
                    <h5 className="text-xs font-medium mb-1 flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1 text-green-600" />
                      Punti di forza
                    </h5>
                    <ul className="text-xs text-muted-foreground ml-4 list-disc">
                      {competitor.strengths.slice(0, 2).map((strength, idx) => (
                        <li key={idx} className="my-0.5">{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                  <div className="mt-2">
                    <h5 className="text-xs font-medium mb-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1 text-amber-600" />
                      Aree di miglioramento
                    </h5>
                    <ul className="text-xs text-muted-foreground ml-4 list-disc">
                      {competitor.weaknesses.slice(0, 2).map((weakness, idx) => (
                        <li key={idx} className="my-0.5">{weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="py-1">
                {competitor.reviewHighlight && (
                  <div className="italic text-xs text-muted-foreground">
                    "{competitor.reviewHighlight}"
                  </div>
                )}
                
                {competitor.category && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(Array.isArray(competitor.category) ? competitor.category : [competitor.category])
                      .slice(0, 3)
                      .map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        )}
        
        <CardFooter className="pt-2 pb-2 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-xs flex items-center p-0"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Meno dettagli
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Più dettagli
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="text-xs"
          >
            <Info className="h-3.5 w-3.5 mr-1" />
            Dettagli
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{competitor.name}</DialogTitle>
            <DialogDescription>
              Analisi dettagliata del competitor
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-2 space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">{formattedAddress}</span>
              </div>
              <div className={`flex items-center ${ratingColor} font-medium`}>
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span>{competitor.rating}</span>
                <span className="text-muted-foreground text-xs ml-1">
                  ({competitor.review_count || 0} recensioni)
                </span>
              </div>
            </div>
            
            <Separator />
            
            {isPro && (
              <>
                {competitor.competitiveAdvantage && (
                  <div>
                    <h5 className="text-sm font-medium mb-1">Vantaggio competitivo</h5>
                    <p className="text-sm text-muted-foreground">{competitor.competitiveAdvantage}</p>
                  </div>
                )}
                
                {competitor.marketPosition && (
                  <div>
                    <h5 className="text-sm font-medium mb-1">Posizionamento</h5>
                    <p className="text-sm text-muted-foreground">{competitor.marketPosition}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {competitor.strengths && competitor.strengths.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-1 flex items-center">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1 text-green-600" />
                        Punti di forza
                      </h5>
                      <ul className="text-sm text-muted-foreground ml-4 list-disc">
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx} className="my-1">{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-1 flex items-center">
                        <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-600" />
                        Aree di miglioramento
                      </h5>
                      <ul className="text-sm text-muted-foreground ml-4 list-disc">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="my-1">{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {!isPro && (
              <>
                <div>
                  <h5 className="text-sm font-medium mb-1">Recensioni</h5>
                  {competitor.reviews && competitor.reviews.length > 0 ? (
                    <div className="space-y-2">
                      {competitor.reviews.map((review, idx) => (
                        <div key={idx} className="bg-muted/30 p-2 rounded">
                          <div className="flex items-center mb-1">
                            {Array(Math.floor(review.rating || 4)).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs italic">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nessuna recensione disponibile</p>
                  )}
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1">Categorie</h5>
                  {competitor.category ? (
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(competitor.category) ? competitor.category : [competitor.category]).map((cat, idx) => (
                        <Badge key={idx} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Categorie non disponibili</p>
                  )}
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="mr-2"
            >
              Chiudi
            </Button>
            {competitor.url && (
              <Button
                onClick={() => window.open(competitor.url, '_blank')}
                className="flex items-center"
              >
                Visita pagina
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
