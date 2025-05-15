
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import { SettingsDialog } from '@/components/SettingsDialog';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';

export const ApiKeysCard: React.FC = () => {
  const { areKeysSet, updateApiKeys } = useApiKeys();
  const { toast } = useToast();
  
  const handleResetKeys = () => {
    // Confirm with user that they really want to reset
    if (window.confirm("Sei sicuro di voler resettare tutte le API keys alle impostazioni demo?")) {
      updateApiKeys({
        googlePlaces: 'demo-key',
        censusGov: 'demo-key', 
        yelp: 'demo-key',
        googleTrends: 'demo-key',
        openAI: 'demo-key'
      });
      
      toast({
        title: "API keys resettate",
        description: "Tutte le API keys sono state resettate alla modalità demo",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Configurazione API
        </CardTitle>
        <CardDescription>
          Configura le API key per utilizzare dati reali anziché demo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {areKeysSet() 
            ? "Alcune API keys sono configurate. Puoi modificarle o aggiungerne altre."
            : "Nessuna API key configurata. L'applicazione utilizzerà dati demo."}
        </p>
        
        <div className="flex items-center justify-between">
          <SettingsDialog />
          
          {areKeysSet() && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleResetKeys}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              Reset a modalità demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
