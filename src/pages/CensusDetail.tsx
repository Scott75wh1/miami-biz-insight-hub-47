
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapIcon, BarChart } from 'lucide-react';
import DetailedCensusView from '@/components/census/DetailedCensusView';
import { DistrictSelector } from '@/components/competitor/DistrictSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import Layout from '@/components/Layout';

const CensusDetail = () => {
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <BarChart className="mr-2 h-6 w-6" />
              Dati del Censimento
            </h1>
            <p className="text-muted-foreground">
              Analisi dettagliata dei dati demografici, economici e abitativi per zona
            </p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <MapIcon className="mr-2 h-5 w-5" />
              Seleziona Zona per Analisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DistrictSelector
              districts={districts}
              selectedDistrict={selectedDistrict}
              onDistrictChange={handleDistrictChange}
            />
          </CardContent>
        </Card>
        
        <DetailedCensusView />
        
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>Miami Business Insight Hub - Dati del censimento forniti dall'American Community Survey</p>
        </footer>
      </div>
    </Layout>
  );
};

export default CensusDetail;
