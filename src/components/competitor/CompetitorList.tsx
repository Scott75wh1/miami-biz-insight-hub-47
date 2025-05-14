
import React, { useEffect } from 'react';
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
  // Normalizza il nome del distretto per gestire "North Miami" correttamente
  const normalizedDistrict = selectedDistrict.toLowerCase().includes('north miami') ? 'North Miami' : selectedDistrict;
  
  // Log per debug quando il componente viene aggiornato
  useEffect(() => {
    console.log(`CompetitorList rendered for district: ${normalizedDistrict}`);
    console.log(`Competitors count: ${competitors.length}`);
  }, [normalizedDistrict, competitors]);

  if (competitors.length === 0 && !isLoading) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Nessun competitor trovato per questa categoria in {normalizedDistrict}
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
            Visualizza tutti i competitor in {normalizedDistrict}
          </button>
        </div>
      )}
    </div>
  );
};
