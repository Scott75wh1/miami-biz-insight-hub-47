
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { Input } from '@/components/ui/input';
import EnhancedAIAssistantRefactored from './EnhancedAIAssistantRefactored';
import AssistantSettingsPanel from './AssistantSettingsPanel';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const AIAssistantContent: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');

  // Utilizzo sicuro del context
  let selectedDistrict = "Miami Beach"; // Default fallback
  
  try {
    // Try to use the district selection hook, but don't crash if it's not available
    const districtContext = useDistrictSelection();
    selectedDistrict = districtContext?.selectedDistrict || "Miami Beach";
  } catch (error) {
    console.warn("District selection not available in AIAssistantContent, using default");
  }

  // Handle business type change
  const handleBusinessTypeChange = (type: BusinessType) => {
    setBusinessType(type);
  };
  
  // Handle business name change
  const handleBusinessNameChange = (name: string) => {
    setBusinessName(name);
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Assistant</CardTitle>
              <CardDescription>
                Informazioni sulla tua attività
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome dell'attività (opzionale)
                </label>
                <Input
                  placeholder="Inserisci il nome dell'attività"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo di attività
                </label>
                <BusinessTypeSelector
                  selectedType={businessType}
                  onTypeChange={handleBusinessTypeChange}
                />
              </div>

              <div className="pt-2">
                <AssistantSettingsPanel 
                  businessType={businessType}
                  businessName={businessName}
                  onBusinessTypeChange={handleBusinessTypeChange}
                  onBusinessNameChange={handleBusinessNameChange}
                />
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Distretto attuale:</strong> {selectedDistrict}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Puoi cambiare il distretto dall'header in alto.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Fai domande e ricevi consigli strategici per la tua attività a {selectedDistrict}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <EnhancedAIAssistantRefactored
                businessType={businessType}
                businessName={businessName || undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantContent;
