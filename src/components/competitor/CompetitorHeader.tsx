
import React from 'react';
import { Building, Loader2 } from 'lucide-react';
import { BusinessType } from '@/components/BusinessTypeSelector';

interface CompetitorHeaderProps {
  businessType: BusinessType;
  isLoading: boolean;
}

export const CompetitorHeader: React.FC<CompetitorHeaderProps> = ({ 
  businessType,
  isLoading 
}) => {
  return (
    <div className="flex items-center">
      <Building className="mr-2 h-5 w-5" />
      Analisi Competitor {businessType && `- ${businessType.replace('_', ' ').charAt(0).toUpperCase() + businessType.replace('_', ' ').slice(1)}`}
      {isLoading && (
        <div className="ml-2 flex items-center text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin mr-1" />
          <span>Caricamento...</span>
        </div>
      )}
    </div>
  );
};
