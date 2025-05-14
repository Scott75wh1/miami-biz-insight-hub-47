
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import BusinessTypeSelector, { BusinessType } from '@/components/BusinessTypeSelector';
import { CuisineTypeSelector } from '@/components/restaurant/CuisineTypeSelector';
import CompetitorAnalysis from '@/components/CompetitorAnalysis';
import { useCuisineSelection } from '@/hooks/useCuisineSelection';

const CompetitorAnalysisPage = () => {
  const { selectedDistrict } = useDistrictSelection();
  const { apiKeys } = useApiKeys();
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const { selectedCuisine, handleCuisineChange } = useCuisineSelection();
  
  const showCuisineSelector = businessType === 'restaurant';

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Analisi Competitiva</h1>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mb-6">
          <BusinessTypeSelector 
            selectedType={businessType}
            onTypeChange={(type) => setBusinessType(type)}
          />
          
          {showCuisineSelector && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Tipo di Cucina</CardTitle>
              </CardHeader>
              <CardContent>
                <CuisineTypeSelector 
                  selectedCuisine={selectedCuisine} 
                  onCuisineChange={handleCuisineChange}
                />
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="mb-6">
          <CompetitorAnalysis 
            businessType={businessType} 
            cuisineType={showCuisineSelector ? selectedCuisine : undefined}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CompetitorAnalysisPage;
