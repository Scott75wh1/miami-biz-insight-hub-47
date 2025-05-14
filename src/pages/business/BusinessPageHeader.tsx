
import React from 'react';
import { Building, RefreshCcw, DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessPageHeaderProps {
  selectedDistrict: string | undefined;
  analysisComplete: boolean;
  analysisData: any | null;
  refreshBusinessData: () => void;
  handleExportData: () => void;
}

export const BusinessPageHeader: React.FC<BusinessPageHeaderProps> = ({
  selectedDistrict,
  analysisComplete,
  analysisData,
  refreshBusinessData,
  handleExportData
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center">
          <Building className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          La mia Attività {selectedDistrict && `- ${selectedDistrict}`}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Analisi personalizzata della tua attività basata sui dati di mercato
        </p>
      </div>
      
      {analysisComplete && analysisData && (
        <div className="flex gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshBusinessData} 
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <RefreshCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            Aggiorna
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportData} 
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <DownloadIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            Esporta
          </Button>
        </div>
      )}
    </div>
  );
};
