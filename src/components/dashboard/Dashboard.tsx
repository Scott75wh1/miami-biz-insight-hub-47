
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Building, ChartBar } from 'lucide-react';
import BusinessInfoForm from '@/components/dashboard/BusinessInfoForm';
import DataVisualizer from '@/components/dashboard/DataVisualizer';
import ModeSelector from '@/components/ModeSelector';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import { useUserType } from '@/hooks/useUserType';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useToast } from '@/hooks/use-toast';
import { RevenueWidget } from './widgets/RevenueWidget';
import { VisitorWidget } from './widgets/VisitorWidget';
import { CategoryWidget } from './widgets/CategoryWidget';
import LatestAnalytics from './LatestAnalytics';

const Dashboard: React.FC = () => {
  const { userType } = useUserType();
  const { selectedDistrict } = useDistrictSelection();
  const { toast } = useToast();
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    type: 'restaurant' as const,
    description: '',
    address: ''
  });
  const [showAssistant, setShowAssistant] = useState(false);
  const [dataCollected, setDataCollected] = useState(false);
  
  const handleBusinessInfoSubmit = (info: {
    name: string, 
    type: string, 
    description: string, 
    address: string
  }) => {
    setBusinessInfo({
      ...info,
      type: info.type as any
    });
    
    // Simuliamo la raccolta dati
    toast({
      title: "Raccolta dati in corso",
      description: "Stiamo analizzando i dati per la tua attività...",
    });
    
    setTimeout(() => {
      setDataCollected(true);
      toast({
        title: "Dati raccolti con successo",
        description: "L'assistente AI è pronto a rispondere alle tue domande",
      });
      setShowAssistant(true);
    }, 2000);
  };
  
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <ModeSelector />
      
      {!showAssistant ? (
        <Card>
          <CardHeader>
            <CardTitle>Informazioni sulla tua attività</CardTitle>
            <CardDescription>
              Inserisci i dati della tua attività per ricevere analisi personalizzate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessInfoForm onSubmit={handleBusinessInfoSubmit} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${userType === 'marketer' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Assistente AI</CardTitle>
                  <CardDescription>
                    Chiedi informazioni strategiche per la tua attività a {selectedDistrict}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAssistant(false)}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Modifica attività
                </Button>
              </CardHeader>
              <CardContent>
                <AIAssistant 
                  businessType={businessInfo.type}
                  businessName={businessInfo.name}
                />
              </CardContent>
            </Card>
            
            {/* Dashboard Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RevenueWidget />
              <VisitorWidget />
            </div>
          </div>
          
          {userType === 'marketer' && (
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="h-4 w-4" />
                    Dati di Mercato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataVisualizer 
                    district={selectedDistrict}
                    businessType={businessInfo.type}
                  />
                </CardContent>
              </Card>
              
              <CategoryWidget />
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Analisi Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <LatestAnalytics />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
