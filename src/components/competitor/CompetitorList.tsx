
import React from 'react';
import { CompetitorCard, Competitor } from './CompetitorCard';
import { Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

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
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="p-3 border rounded-md">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="mt-3">
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-200 mb-2" />
              <div className="flex justify-between mt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (competitors.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <div className="mb-3">
          Nessun competitor trovato per questa categoria in {normalizedDistrict}
        </div>
        <div className="text-sm text-muted-foreground">
          Prova a selezionare un altro tipo di business o cambiare distretto
        </div>
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
