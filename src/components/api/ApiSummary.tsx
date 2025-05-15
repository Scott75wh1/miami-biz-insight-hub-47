
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle } from 'lucide-react';

export const ApiSummary: React.FC = () => {
  const { apiKeys, isApiKeyValid } = useApiKeys();
  
  // Calcola lo stato generale delle API
  const validKeys = Object.keys(apiKeys).filter(key => isApiKeyValid(key as keyof typeof apiKeys));
  const allKeysCount = Object.keys(apiKeys).length;
  const validKeysCount = validKeys.length;
  
  // Stato complessivo
  const overallStatus = validKeysCount === 0 ? "demo" : 
                        validKeysCount < allKeysCount ? "partial" : "complete";
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className={`h-4 w-4 ${overallStatus === 'complete' ? 'text-green-500' : 'text-amber-500'}`} />
            <span className="font-medium text-sm">API Status</span>
          </div>
          
          <Badge 
            variant={overallStatus === 'complete' ? 'success' : 'default'}
            className={overallStatus === 'demo' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                    overallStatus === 'partial' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}>
            {overallStatus === 'complete' ? 'Tutte attive' : 
            overallStatus === 'partial' ? 'Parziale' : 'Demo'}
          </Badge>
        </div>
        
        {overallStatus !== 'complete' && (
          <div className="mt-2 text-xs flex items-start gap-1.5 text-muted-foreground">
            <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
            <span>
              {overallStatus === 'demo' 
                ? "Usando dati demo per tutte le API" 
                : `${validKeysCount}/${allKeysCount} API keys attive`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
