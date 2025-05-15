
import React, { useState } from 'react';
import { Grid } from 'lucide-react';
import AIAssistant from './AIAssistant';
import AssistantSettingsPanel from './AssistantSettingsPanel';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ApiLogViewer from '@/components/debug/ApiLogViewer';

const AIAssistantContent: React.FC = () => {
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  return (
    <div className="container py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assistente AI</h1>
        
        {isMobile && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSettings}
          >
            <Grid className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-[calc(100vh-12rem)]">
        {/* Mobile settings panel */}
        {isMobile && showSettings && (
          <div className="lg:col-span-1">
            <AssistantSettingsPanel 
              businessType={businessType}
              businessName={businessName}
              onBusinessTypeChange={setBusinessType}
              onBusinessNameChange={setBusinessName}
            />
          </div>
        )}
        
        {/* Chat interface */}
        <div className={`${!isMobile ? 'lg:col-span-2' : 'lg:col-span-3'} h-full`}>
          <AIAssistant 
            businessType={businessType}
            businessName={businessName}
          />
        </div>
        
        {/* Desktop settings panel (always visible on desktop) */}
        {!isMobile && (
          <div className="lg:col-span-1 h-full">
            <AssistantSettingsPanel 
              businessType={businessType}
              businessName={businessName}
              onBusinessTypeChange={setBusinessType}
              onBusinessNameChange={setBusinessName}
            />
          </div>
        )}
      </div>
      
      {/* Debug components */}
      <ApiLogViewer />
    </div>
  );
};

export default AIAssistantContent;
