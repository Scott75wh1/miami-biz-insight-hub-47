
import React from 'react';
import { MapPin, ExternalLink, Star } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Competitor } from '../types';
import { CompetitorRating } from './CompetitorRating';
import { StrengthsWeaknessSection } from './StrengthsWeaknessSection';
import { CompetitorReviews } from './CompetitorReviews';
import { CategoryBadges } from './CategoryBadges';

interface CompetitorDetailsDialogProps {
  competitor: Competitor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPro: boolean;
}

export const CompetitorDetailsDialog: React.FC<CompetitorDetailsDialogProps> = ({
  competitor,
  open,
  onOpenChange,
  isPro,
}) => {
  const handleClose = () => {
    onOpenChange(false);
  };
  
  const formattedAddress = typeof competitor.location === 'string' 
    ? competitor.location 
    : competitor.location?.address1 || 'Indirizzo non disponibile';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <CompetitorRating 
              rating={competitor.rating} 
              reviews={competitor.reviews} 
              review_count={competitor.review_count}
              className="text-base"
            />
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
              
              <StrengthsWeaknessSection 
                strengths={competitor.strengths}
                weaknesses={competitor.weaknesses}
                showAll={true}
              />
            </>
          )}
          
          {!isPro && (
            <>
              <div>
                <h5 className="text-sm font-medium mb-1">Recensioni</h5>
                <CompetitorReviews reviews={competitor.reviewsData} />
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-1">Categorie</h5>
                <CategoryBadges category={competitor.category} limit={100} />
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
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
  );
};
