
import React, { useState } from 'react';
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { type Competitor } from './types';
import { useUserType } from '@/hooks/useUserType';
import { CompetitorRating } from './card/CompetitorRating';
import { StrengthsWeaknessSection } from './card/StrengthsWeaknessSection';
import { CategoryBadges } from './card/CategoryBadges';
import { CompetitorDetailsDialog } from './card/CompetitorDetailsDialog';

export interface CompetitorCardProps {
  competitor: Competitor;
  index?: number;
  isExpanded?: boolean;
}

export const CompetitorCard: React.FC<CompetitorCardProps> = ({ 
  competitor, 
  index = 0, 
  isExpanded = false 
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userType } = useUserType();
  const isPro = userType === 'marketer';
  
  // Format address for display
  const formattedAddress = typeof competitor.location === 'string' 
    ? competitor.location 
    : competitor.location?.address1 || 'Indirizzo non disponibile';
  
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
              <CompetitorRating 
                rating={competitor.rating} 
                reviews={competitor.reviews}
                review_count={competitor.review_count}
              />
              
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
              <StrengthsWeaknessSection 
                strengths={competitor.strengths}
                weaknesses={competitor.weaknesses}
              />
            ) : (
              <div className="py-1">
                {competitor.reviewHighlight && (
                  <div className="italic text-xs text-muted-foreground">
                    "{competitor.reviewHighlight}"
                  </div>
                )}
                
                <CategoryBadges 
                  category={competitor.category} 
                  className="mt-2"
                />
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
      
      <CompetitorDetailsDialog
        competitor={competitor}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isPro={isPro}
      />
    </>
  );
};
