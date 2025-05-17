
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { type Competitor } from '../types';
import { CompetitorPopoverContent } from './CompetitorPopoverContent';

interface CompetitorItemActionsProps {
  competitor: Competitor;
  isExpanded: boolean;
  onViewDetails: (competitor: Competitor, e: React.MouseEvent) => void;
}

export const CompetitorItemActions: React.FC<CompetitorItemActionsProps> = ({
  competitor,
  isExpanded,
  onViewDetails,
}) => {
  return (
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
  );
};
