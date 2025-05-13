
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapIcon } from 'lucide-react';
import DetailedCensusView from '@/components/census/DetailedCensusView';
import { DistrictSelector } from '@/components/competitor/DistrictSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const CensusDetail = () => {
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dati del Censimento</h1>
            <p className="text-muted-foreground">
              Analisi dettagliata dei dati demografici, economici e abitativi per zona
            </p>
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
        </main>
      </div>
    </div>
  );
};

export default CensusDetail;
