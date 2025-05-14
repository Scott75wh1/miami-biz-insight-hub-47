
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { TrendsProvider } from '@/components/trends/TrendsContext';
import SearchTrendsChart from '@/components/trends/SearchTrendsChart';
import GrowingCategories from '@/components/trends/GrowingCategories';
import TrendsRecommendations from '@/components/trends/TrendsRecommendations';
import { useTrendsData } from '@/components/trends/TrendsContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MarketTrendsContent = () => {
  const { selectedDistrict } = useDistrictSelection();
  const { searchTrends, growingCategories, aiRecommendations, isLoading, isAiLoading, fetchTrendsData, isUsingDemoKey } = useTrendsData();
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');

  useEffect(() => {
    fetchTrendsData(businessType, selectedDistrict);
  }, [businessType, selectedDistrict, fetchTrendsData]);

  return (
    <div className="space-y-6">
      <BusinessTypeSelector 
        selectedType={businessType}
        onTypeChange={(type) => setBusinessType(type)}
      />
      
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <span>Trend di Mercato per {selectedDistrict}</span>
              {isLoading && (
                <div className="ml-2 flex items-center text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  <span>Caricamento...</span>
                </div>
              )}
            </div>
          </CardTitle>
          {isUsingDemoKey && (
            <Alert className="mt-2 py-2 bg-amber-50 border-amber-200 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Stai visualizzando trend dimostrativi. Inserisci una API key valida nelle impostazioni per accedere ai dati reali.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <SearchTrendsChart searchTrends={searchTrends} />
            </div>
            <div>
              <GrowingCategories categories={growingCategories} />
            </div>
          </div>
          
          <div className="mt-6">
            <TrendsRecommendations 
              summary={aiRecommendations.summary}
              recommendations={aiRecommendations.recommendations}
              isLoading={isAiLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MarketTrendsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Trend di Mercato</h1>
        <TrendsProvider>
          <MarketTrendsContent />
        </TrendsProvider>
      </div>
    </Layout>
  );
};

export default MarketTrendsPage;
