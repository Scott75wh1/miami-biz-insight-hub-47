
import React from 'react';

interface ApiKeyWarningProps {
  isOpenAIConfigured: boolean;
}

const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ isOpenAIConfigured }) => {
  if (isOpenAIConfigured) return null;
  
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-2 rounded text-xs text-amber-800 dark:text-amber-300">
      <span className="font-medium">Modalità demo:</span> Configura la API key di OpenAI nelle impostazioni per risposte personalizzate.
    </div>
  );
};

export default ApiKeyWarning;
