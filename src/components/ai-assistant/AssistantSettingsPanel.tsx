
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BusinessType } from '@/components/BusinessTypeSelector';
import BusinessTypeSelector from '@/components/BusinessTypeSelector';
import UserTypeSelector from '@/components/UserTypeSelector';
import { useUserType } from '@/hooks/useUserType';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';

interface AssistantSettingsPanelProps {
  businessType: BusinessType;
  businessName: string;
  onBusinessTypeChange: (type: BusinessType) => void;
  onBusinessNameChange: (name: string) => void;
}

const AssistantSettingsPanel: React.FC<AssistantSettingsPanelProps> = ({
  businessType,
  businessName,
  onBusinessTypeChange,
  onBusinessNameChange,
}) => {
  const { userType, setUserType } = useUserType();
  const { selectedDistrict } = useDistrictSelection();
  const { apiKeys } = useApiKeys();

  return (
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
              onTypeChange={onBusinessTypeChange}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Nome attività (opzionale)</label>
            <Input
              placeholder="Inserisci il nome della tua attività"
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
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
  );
};

export default AssistantSettingsPanel;
