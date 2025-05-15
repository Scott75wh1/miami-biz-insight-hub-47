
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIAssistant from './AIAssistant';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AIAssistantContent: React.FC = () => {
  const { selectedDistrict } = useDistrictSelection();
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [businessName, setBusinessName] = useState('');

  const handleBusinessTypeChange = (type: BusinessType) => {
    setBusinessType(type);
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Assistente AI</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Nome della tua attività</Label>
                <Input 
                  id="business-name" 
                  placeholder="Nome attività" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tipo di attività</Label>
                <BusinessTypeSelector
                  selectedType={businessType}
                  onTypeChange={handleBusinessTypeChange}
                />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">
                  Distretto corrente: <span className="font-semibold">{selectedDistrict}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Cambia il distretto nella sezione Competitors
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="chat">
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Assistente Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="h-[70vh]">
              <AIAssistant 
                businessType={businessType}
                businessName={businessName}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantContent;
