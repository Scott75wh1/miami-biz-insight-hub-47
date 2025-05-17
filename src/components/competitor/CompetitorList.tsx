
import React, { useState } from 'react';
import { useCompetitorData } from './hooks/useCompetitorData';
import { CompetitorItem } from './card/CompetitorItem';
import { CompetitorSkeleton } from './card/CompetitorSkeleton';
import { CompetitorEmptyState } from './card/CompetitorEmptyState';
import { useIsMobile } from '@/hooks/use-mobile';
import { Competitor } from './types';
import { useApiKeys } from '@/hooks/useApiKeys';

interface CompetitorListProps {
  businessType?: string;
  district?: string;
  limit?: number;
}

const CompetitorList: React.FC<CompetitorListProps> = ({ 
  businessType, 
  district,
  limit 
}) => {
  const { apiKeys, isLoaded } = useApiKeys();
  const { competitors, isLoading } = useCompetitorData(
    businessType, 
    district,
    apiKeys,
    isLoaded
  );
  const isMobile = useIsMobile();
  const [expandedCompetitorId, setExpandedCompetitorId] = useState<string | null>(null);
  
  // Limita il numero di competitors da mostrare se specificato
  const displayCompetitors = limit ? competitors.slice(0, limit) : competitors;

  // Handlers for CompetitorItem
  const handleCompetitorClick = (competitor: Competitor) => {
    setExpandedCompetitorId(prev => prev === competitor.id ? null : competitor.id);
  };
  
  const handleViewDetails = (competitor: Competitor, e: React.MouseEvent) => {
    e.stopPropagation();
    // You could implement an action here, like opening a modal with details
    console.log("View details for:", competitor.name);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <CompetitorSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!displayCompetitors.length) {
    return <CompetitorEmptyState district={district || "questo distretto"} />;
  }

  return (
    <div className={`space-y-4 ${isMobile ? 'pb-16' : ''}`}>
      {displayCompetitors.map((competitor, index) => (
        <CompetitorItem 
          key={competitor.id}
          competitor={competitor}
          index={index}
          expandedCompetitorId={expandedCompetitorId}
          onCompetitorClick={handleCompetitorClick}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};

export default CompetitorList;
