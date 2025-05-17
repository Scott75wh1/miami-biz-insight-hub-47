
import React from 'react';

interface CompetitorEmptyStateProps {
  district: string;
  businessType?: string;
}

export const CompetitorEmptyState: React.FC<CompetitorEmptyStateProps> = ({ district, businessType }) => {
  return (
    <div className="text-center p-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
      <div className="mb-3">
        Nessun competitor trovato per questa categoria in {district}
      </div>
      <div className="text-sm text-muted-foreground">
        Prova a selezionare un altro tipo di business o cambiare distretto
      </div>
    </div>
  );
};
