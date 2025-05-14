
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, BarChart, Building, Search, MapIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import DataCollectionSummary from '@/components/dashboard/DataCollectionSummary';
import ApiStatusIndicators from '@/components/dashboard/ApiStatusIndicators';
import LatestAnalytics from '@/components/dashboard/LatestAnalytics';
import QuickActions from '@/components/dashboard/QuickActions';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Skeleton } from '@/components/ui/skeleton';
import InteractiveMap from '@/components/map/InteractiveMap';

const Index = () => {
  const navigate = useNavigate();
  const { areKeysSet } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisClick = () => {
    navigate('/my-business');
  };

  const handleDataClick = () => {
    navigate('/census');
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col space-y-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Miami Business Insight Hub</CardTitle>
              <CardDescription className="text-lg">
                Raccogli, analizza e ottimizza la tua attività con dati avanzati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-md mb-4 md:mb-0">
                  <p className="mb-4">
                    Benvenuto nella piattaforma completa per dati demografici, analisi di mercato e intelligence
                    competitiva per la tua attività a Miami.
                  </p>
                  <div className="flex space-x-2">
                    <Button onClick={handleAnalysisClick} className="flex items-center gap-2">
                      <Building size={18} />
                      Analizza la tua Attività
                    </Button>
                    <Button onClick={handleDataClick} variant="outline" className="flex items-center gap-2">
                      <Database size={18} />
                      Esplora Dati
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Area selezionata</p>
                    <p className="text-xl font-semibold">{selectedDistrict}</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => navigate('/census')}>
                      <MapIcon size={16} className="mr-1" /> Cambia
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-5 w-5" />
                Mappa Interattiva di {selectedDistrict}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[300px]">
              <InteractiveMap />
            </CardContent>
          </Card>

          {/* API Status */}
          <ApiStatusIndicators />

          {/* Data Collection Summary */}
          <DataCollectionSummary />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Latest Analytics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Analisi Recenti
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-[125px] w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                  </div>
                ) : (
                  <LatestAnalytics />
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Azioni Rapide
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-[125px] w-full" />
                  </div>
                ) : (
                  <QuickActions />
                )}
              </CardContent>
            </Card>
          </div>

          <footer className="text-center text-xs text-muted-foreground">
            <p>Miami Business Insight Hub - Dati aggiornati a Maggio 2025</p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
