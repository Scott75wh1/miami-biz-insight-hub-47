
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapIcon, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DistrictSelector } from '@/components/competitor/DistrictSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const CensusPage = () => {
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/census/${selectedDistrict}`);
  };
  
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Database className="mr-2 h-6 w-6" />
              Dati del Censimento
            </h1>
            <p className="text-muted-foreground">
              Esplora i dati demografici, economici e abitativi di Miami per distretto
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
            
            <div className="mt-6">
              <Button onClick={handleViewDetails} className="w-full">
                Visualizza Dettagli per {selectedDistrict}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {districts.map(district => (
            <Card 
              key={district} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                handleDistrictChange(district);
                navigate(`/census/${district}`);
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle>{district}</CardTitle>
                <CardDescription>Dati del censimento</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualizza i dati demografici, economici e abitativi per {district}.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>Miami Business Insight Hub - Dati del censimento forniti dall'American Community Survey</p>
        </footer>
      </div>
    </Layout>
  );
};

export default CensusPage;
