
import React from 'react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { CompetitorCard } from '../CompetitorCard';
import { type Competitor } from '../types';
import { CompetitorExpandedContent } from './CompetitorExpandedContent';
import { CompetitorItemActions } from './CompetitorItemActions';

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
          
          <CompetitorItemActions 
            competitor={competitor} 
            isExpanded={isExpanded} 
            onViewDetails={onViewDetails}
          />
        </div>
      </div>
      
      <CollapsibleContent>
        <CompetitorExpandedContent competitor={competitor} />
      </CollapsibleContent>
    </Collapsible>
  );
};
