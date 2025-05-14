
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
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <Building className="mr-2 h-6 w-6" />
          La mia Attività {selectedDistrict && `- ${selectedDistrict}`}
        </h1>
        <p className="text-muted-foreground">
          Analisi personalizzata della tua attività basata sui dati di mercato
        </p>
      </div>
      
      {analysisComplete && analysisData && (
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshBusinessData} 
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Aggiorna
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportData} 
            className="flex items-center gap-2"
          >
            <DownloadIcon className="h-4 w-4" />
            Esporta
          </Button>
        </div>
      )}
    </div>
  );
};
