
import React from 'react';
import { InfoCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ApiKeyWarningProps {
  isOpenAIConfigured: boolean;
}

const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ isOpenAIConfigured }) => {
  const navigate = useNavigate();
  
  if (isOpenAIConfigured) return null;
  
  const goToSettings = () => {
    navigate('/settings');
  };
  
  return (
    <Alert variant="warning" className="bg-amber-50 border-amber-200 text-amber-800">
      <InfoCircle className="h-4 w-4 mr-2" />
      <AlertDescription className="text-xs flex-1">
        Stai utilizzando la modalità demo. Per risposte personalizzate, configura la tua API key OpenAI nelle impostazioni.
      </AlertDescription>
      <Button variant="outline" size="sm" onClick={goToSettings} className="ml-2 text-xs">
        Impostazioni
      </Button>
    </Alert>
  );
};

export default ApiKeyWarning;
