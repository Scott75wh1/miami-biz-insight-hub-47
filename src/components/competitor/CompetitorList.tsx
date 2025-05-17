
import React from 'react';
import { useCompetitorData } from './hooks/useCompetitorData';
import { CompetitorItem } from './card/CompetitorItem';
import { CompetitorSkeleton } from './card/CompetitorSkeleton';
import { CompetitorEmptyState } from './card/CompetitorEmptyState';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const { competitors, isLoading } = useCompetitorData(businessType, district);
  const isMobile = useIsMobile();
  
  // Limita il numero di competitors da mostrare se specificato
  const displayCompetitors = limit ? competitors.slice(0, limit) : competitors;

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
      {displayCompetitors.map((competitor) => (
        <CompetitorItem 
          key={competitor.id} 
          competitor={competitor}
        />
      ))}
    </div>
  );
};

export default CompetitorList;
