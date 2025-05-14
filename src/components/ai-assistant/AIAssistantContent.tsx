
import React, { useState, useEffect } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import AssistantSettingsPanel from './AssistantSettingsPanel';
import AIAssistant from './AIAssistant';
import { toast } from '@/hooks/use-toast';

const AIAssistantContent: React.FC = () => {
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessName, setBusinessName] = useState('');
  const { apiKeys } = useApiKeys();

  // Show a warning if API keys aren't set
  useEffect(() => {
    if (!apiKeys.openAI || apiKeys.openAI === 'demo-key') {
      toast({
        title: "Modalità dimostrativa attiva",
        description: "Per utilizzare l'assistente AI con funzionalità complete, imposta l'API key di OpenAI nelle impostazioni.",
        variant: "default",
      });
    }
  }, [apiKeys.openAI]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Assistente AI</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <AssistantSettingsPanel 
            businessType={businessType}
            businessName={businessName}
            onBusinessTypeChange={setBusinessType}
            onBusinessNameChange={setBusinessName}
          />
        </div>
        
        <div className="md:col-span-2">
          <AIAssistant 
            businessType={businessType}
            businessName={businessName || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default AIAssistantContent;
