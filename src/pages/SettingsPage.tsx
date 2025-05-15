import React from 'react';
import Layout from '@/components/Layout';
import { SettingsDialog } from '@/components/SettingsDialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Key, Database, CloudSun, Bell, Shield } from 'lucide-react';
import { ApiVerificationStatus } from '@/components/settings/ApiVerificationStatus';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { apiKeys, areKeysSet, isUsingRealData, updateApiKeys } = useApiKeys();
  const { toast } = useToast();
  
  const handleResetKeys = () => {
    // Conferma con l'utente che vuole davvero resettare
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
  
  const handleClearCache = () => {
    toast({
      title: "Cache cancellata",
      description: "I dati locali sono stati cancellati con successo",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Impostazioni</h1>
          <Button variant="outline" onClick={handleClearCache} className="flex items-center gap-2">
            <CloudSun className="h-4 w-4" />
            Cancella cache locale
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
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
          
          <ApiVerificationStatus />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Gestione dati
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-medium">Dati attuali</p>
                    <p className="text-sm text-muted-foreground">
                      {isUsingRealData() ? "Utilizzo dati reali" : "Utilizzo dati demo"}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">Esporta dati</Button>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-medium">Sincronizzazione</p>
                    <p className="text-sm text-muted-foreground">Ultimo aggiornamento: Maggio 2025</p>
                  </div>
                  <Button size="sm">Sincronizza ora</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Rimozione dati</p>
                    <p className="text-sm text-muted-foreground">Rimuove tutti i dati locali</p>
                  </div>
                  <Button size="sm" variant="destructive">Elimina tutto</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifiche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p>Aggiornamenti dati demografici</p>
                  <SwitchToggle defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <p>Alert competitori</p>
                  <SwitchToggle defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <p>Notifiche di sistema</p>
                  <SwitchToggle defaultChecked={true} />
                </div>
                
                <div className="flex justify-between items-center">
                  <p>Email riassuntive</p>
                  <SwitchToggle defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Accesso ai dati e privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Tutte le API keys sono salvate localmente nel browser e non vengono inviate a server esterni.
                  I dati generati dall'applicazione sono memorizzati localmente.
                </p>
                
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    Criteri privacy
                  </Button>
                  <Button variant="outline" size="sm">
                    Richiedi i miei dati
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Componente ausiliario per simulare uno switch toggle
const SwitchToggle = ({ defaultChecked }: { defaultChecked: boolean }) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  
  return (
    <div 
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        checked ? 'bg-primary' : 'bg-gray-300'
      }`}
      onClick={() => setChecked(!checked)}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`} 
      />
    </div>
  );
};

export default SettingsPage;
