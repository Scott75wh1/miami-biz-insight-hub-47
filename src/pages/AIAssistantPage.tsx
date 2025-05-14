
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserTypeProvider, useUserType } from '@/hooks/useUserType';
import UserTypeSelector from '@/components/UserTypeSelector';
import EnhancedAIAssistant from '@/components/EnhancedAIAssistant';
import { toast } from '@/hooks/use-toast';

const AIAssistantPageContent: React.FC = () => {
  const { selectedDistrict } = useDistrictSelection();
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessName, setBusinessName] = useState('');
  const { userType, setUserType } = useUserType();
  const { apiKeys } = useApiKeys();

  // Show a warning if API keys aren't set
  useEffect(() => {
    if (!apiKeys.openAI || apiKeys.openAI === 'demo-key') {
      toast({
        title: "Modalità dimostrativa attiva",
        description: "Per utilizzare l'assistente AI con funzionalità complete, imposta l'API key di OpenAI nelle impostazioni.",
        variant: "warning",
      });
    }
  }, [apiKeys.openAI]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Assistente AI</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardContent className="p-4 space-y-6">
              <h2 className="text-lg font-medium">Configura l'assistente</h2>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Tipo di utente</label>
                <UserTypeSelector
                  selectedType={userType}
                  onTypeChange={setUserType}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {userType === 'end_user' 
                    ? "Interfaccia semplificata con suggerimenti pratici" 
                    : "Interfaccia avanzata con analisi dettagliate"}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tipo di attività</label>
                  <BusinessTypeSelector 
                    selectedType={businessType}
                    onTypeChange={setBusinessType}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Nome attività (opzionale)</label>
                  <Input
                    placeholder="Inserisci il nome della tua attività"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="border rounded-md p-3 bg-muted/50">
                <h3 className="text-sm font-medium mb-2">Informazioni</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full px-2 text-xs mr-2 mt-0.5">Distretto</span>
                    <span>{selectedDistrict}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full px-2 text-xs mr-2 mt-0.5">Modalità</span>
                    <span>{userType === 'end_user' ? 'Utente Finale' : 'Professionista Marketing'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full px-2 text-xs mr-2 mt-0.5">API</span>
                    <span>{apiKeys.openAI && apiKeys.openAI !== 'demo-key' ? 'OpenAI connesso' : 'Modalità demo'}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <EnhancedAIAssistant 
            businessType={businessType}
            businessName={businessName || undefined}
          />
        </div>
      </div>
    </div>
  );
};

// Wrapper component that provides the UserTypeContext
const AIAssistantPage: React.FC = () => (
  <UserTypeProvider>
    <Layout>
      <AIAssistantPageContent />
    </Layout>
  </UserTypeProvider>
);

export default AIAssistantPage;
