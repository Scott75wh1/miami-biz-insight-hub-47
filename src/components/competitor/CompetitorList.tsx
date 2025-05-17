
import React, { useState } from 'react';
import { type Competitor } from './types';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { CompetitorItem } from './card/CompetitorItem';
import { CompetitorSkeleton } from './card/CompetitorSkeleton';
import { CompetitorEmptyState } from './card/CompetitorEmptyState';

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
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <CompetitorSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (competitors.length === 0) {
    return <CompetitorEmptyState district={normalizedDistrict} />;
  }

  return (
    <div className="space-y-4">
      {competitors.map((competitor, index) => (
        <CompetitorItem 
          key={`${competitor.id || competitor.name}-${index}`}
          competitor={competitor}
          index={index}
          expandedCompetitorId={expandedCompetitorId}
          onCompetitorClick={handleCompetitorClick}
          onViewDetails={handleViewDetails}
        />
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
