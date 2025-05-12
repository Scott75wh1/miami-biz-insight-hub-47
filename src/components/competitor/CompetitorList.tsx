
import React from 'react';
import { CompetitorCard, Competitor } from './CompetitorCard';

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
  if (competitors.length === 0 && !isLoading) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Nessun competitor trovato per questa categoria
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {competitors.map((competitor, index) => (
        <CompetitorCard key={`${competitor.name}-${index}`} competitor={competitor} />
      ))}

      {competitors.length > 0 && (
        <div className="text-center mt-4">
          <button type="button" className="text-primary text-sm hover:underline">
            Visualizza tutti i competitor in {selectedDistrict}
          </button>
        </div>
      )}
    </div>
  );
};
