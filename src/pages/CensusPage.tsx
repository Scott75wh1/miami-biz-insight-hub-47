
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapIcon, Users, Building, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useNavigate } from 'react-router-dom';
import { DISTRICT_CENSUS_DATA } from '@/services/api/census/mockCensusData';
import InteractiveMap from '@/components/map/InteractiveMap';

interface CensusDataSummary {
  population?: number;
  medianAge?: number;
  medianIncome?: string;
  businesses?: number;
}

const CensusPage: React.FC = () => {
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();
  const navigate = useNavigate();
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Get basic data for each district
  const getDistrictData = (district: string): CensusDataSummary => {
    const districtData = DISTRICT_CENSUS_DATA[district];
    if (!districtData) return {};
    
    return {
      population: districtData.demographics?.population,
      medianAge: districtData.demographics?.median_age,
      medianIncome: districtData.economics?.median_income 
        ? `$${districtData.economics.median_income.toLocaleString()}`
        : undefined,
      businesses: districtData.economics?.business_count
    };
  };

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Dati del Censimento</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-[500px] mb-6">
              <CardHeader className="pb-0">
                <CardTitle>Mappa Interattiva di Miami</CardTitle>
              </CardHeader>
              <CardContent className="h-full p-0">
                <InteractiveMap onHoverDistrict={setHoveredDistrict} />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5" />
                  {hoveredDistrict ? hoveredDistrict : selectedDistrict}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hoveredDistrict ? (
                  <DistrictSummary district={hoveredDistrict} />
                ) : (
                  <DistrictSummary district={selectedDistrict} />
                )}
                
                <Button 
                  onClick={() => navigate(`/census/${hoveredDistrict || selectedDistrict}`)}
                  className="w-full mt-4"
                >
                  Dettagli Completi <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distretti di Miami</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-auto">
                <div className="space-y-2">
                  {districts.map((district) => (
                    <Button
                      key={district}
                      variant={district === selectedDistrict ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleDistrictChange(district)}
                    >
                      {district}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {districts.slice(0, 6).map((district) => (
            <Card key={district} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{district}</CardTitle>
              </CardHeader>
              <CardContent>
                <DistrictSummary district={district} />
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full mt-4" 
                  onClick={() => navigate(`/census/${district}`)}
                >
                  Vedi Dettagli
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

interface DistrictSummaryProps {
  district: string;
}

const DistrictSummary: React.FC<DistrictSummaryProps> = ({ district }) => {
  const data = getDistrictData(district);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Popolazione</span>
        <span className="font-medium">{data.population?.toLocaleString() || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Età Media</span>
        <span className="font-medium">{data.medianAge || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Reddito Medio</span>
        <span className="font-medium">{data.medianIncome || 'N/A'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Attività</span>
        <span className="font-medium">{data.businesses?.toLocaleString() || 'N/A'}</span>
      </div>
    </div>
  );
};

export default CensusPage;
