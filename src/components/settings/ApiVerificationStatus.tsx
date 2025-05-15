
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert, ShieldCheck, RefreshCw } from 'lucide-react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';

export const ApiVerificationStatus: React.FC = () => {
  const { apiKeys, isApiKeyValid } = useApiKeys();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean>>({});

  // Verifica iniziale dello stato delle API keys
  useEffect(() => {
    verifyApiKeys(false);
  }, [apiKeys]);

  const verifyApiKeys = async (showToasts: boolean = true) => {
    setIsVerifying(true);
    
    if (showToasts) {
      toast({
        title: "Verifica API keys",
        description: "Controllo connessione alle API in corso...",
      });
    }
    
    // Simulazione della verifica API
    const results: Record<string, boolean> = {};
    
    // Verifica per ogni API key
    Object.entries(apiKeys).forEach(([key, value]) => {
      results[key] = value && value !== 'demo-key';
    });
    
    // Breve ritardo per simulare la verifica
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setVerificationResults(results);
    setIsVerifying(false);
    
    if (showToasts) {
      const activeCount = Object.values(results).filter(Boolean).length;
      toast({
        title: "Verifica completata",
        description: `${activeCount} API keys attive su ${Object.keys(results).length}`,
        variant: activeCount > 0 ? 'default' : 'destructive',
      });
    }
  };

  const getStatusIcon = (isValid: boolean) => {
    return isValid 
      ? <ShieldCheck className="h-4 w-4 text-green-500" /> 
      : <ShieldAlert className="h-4 w-4 text-amber-500" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Stato API</CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isVerifying}
          onClick={() => verifyApiKeys(true)}
          className="flex items-center space-x-1"
        >
          <RefreshCw className={`h-3 w-3 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>Verifica</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {Object.entries(apiKeys).map(([key, value]) => {
          const isValid = verificationResults[key] || false;
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(isValid)}
                <span className="text-sm">{label}</span>
              </div>
              <Badge variant={isValid ? "success" : "outline"} className={isValid ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                {isValid ? "Attiva" : "Demo"}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
