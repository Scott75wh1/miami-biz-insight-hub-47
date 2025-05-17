
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CompetitorCard } from '../CompetitorCard';
import { type Competitor } from '../types';
import { CompetitorPopoverContent } from './CompetitorPopoverContent';
import { CompetitorExpandedContent } from './CompetitorExpandedContent';

interface CompetitorItemProps {
  competitor: Competitor;
  index: number;
  expandedCompetitorId: string | null;
  onCompetitorClick: (competitor: Competitor) => void;
  onViewDetails: (competitor: Competitor, e: React.MouseEvent) => void;
}

export const CompetitorItem: React.FC<CompetitorItemProps> = ({
  competitor,
  index,
  expandedCompetitorId,
  onCompetitorClick,
  onViewDetails,
}) => {
  const isExpanded = expandedCompetitorId === competitor.id;
  
  return (
    <Collapsible 
      open={isExpanded}
      onOpenChange={() => onCompetitorClick(competitor)}
      className="border rounded-md p-0 overflow-hidden transition-all duration-200 hover:shadow-md"
    >
      <div className={`p-3 ${isExpanded ? 'bg-muted/20' : ''}`}>
        <div className="flex justify-between items-start">
          <CollapsibleTrigger className="w-full text-left flex-1">
            <CompetitorCard 
              competitor={competitor} 
              isExpanded={isExpanded}
              index={index}
            />
          </CollapsibleTrigger>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={(e) => onViewDetails(competitor, e)}
                  className="ml-2 text-xs"
                >
                  Dettagli
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <CompetitorPopoverContent 
                  competitor={competitor} 
                  onClose={onViewDetails}
                />
              </PopoverContent>
            </Popover>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1.5 ml-2 h-8 w-8"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </div>
      
      <CollapsibleContent>
        <CompetitorExpandedContent competitor={competitor} />
      </CollapsibleContent>
    </Collapsible>
  );
};
