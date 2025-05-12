
import React from 'react';
import { ChartBar, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BusinessType } from '@/components/BusinessTypeSelector';

interface TrendsHeaderProps {
  businessType: BusinessType;
  isLoading: boolean;
  isUsingDemoKey: boolean;
}

const TrendsHeader = ({ businessType, isLoading, isUsingDemoKey }: TrendsHeaderProps) => {
  return (
    <>
      <div className="flex items-center">
        <ChartBar className="mr-2 h-5 w-5" />
        Trend di Mercato {businessType && `- ${businessType.replace('_', ' ').charAt(0).toUpperCase() + businessType.replace('_', ' ').slice(1)}`}
        {isLoading && (
          <div className="ml-2 flex items-center text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            <span>Caricamento...</span>
          </div>
        )}
      </div>
      {isUsingDemoKey && (
        <Alert className="mt-2 py-2 bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Stai visualizzando trend dimostrativi. Inserisci una API key valida nelle impostazioni per accedere ai dati reali.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default TrendsHeader;
