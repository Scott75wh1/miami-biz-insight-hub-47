
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Building, GraduationCap, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DISTRICT_CENSUS_DATA } from '@/services/api/census/mockCensusData';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const CensusDetail: React.FC = () => {
  const { district } = useParams<{ district: string }>();
  const navigate = useNavigate();
  const { handleDistrictChange } = useDistrictSelection();
  const [activeTab, setActiveTab] = React.useState('demographics');
  
  useEffect(() => {
    // Update the selected district when the page loads
    if (district) {
      handleDistrictChange(district);
    }
  }, [district, handleDistrictChange]);
  
  // Get district data from mock data
  const districtData = district ? DISTRICT_CENSUS_DATA[district] : null;
  
  if (!district || !districtData) {
    return (
      <Layout>
        <div className="container py-6">
          <Button variant="ghost" onClick={() => navigate('/census')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna alla Lista
          </Button>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-xl font-semibold mb-2">Distretto non trovato</h2>
              <p className="text-muted-foreground mb-4">Il distretto richiesto non è disponibile nei dati del censimento.</p>
              <Button onClick={() => navigate('/census')}>Torna alla Pagina del Censimento</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const { demographics, economics, education, housing } = districtData;

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/census')} className="mr-2">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Torna alla Lista
            </Button>
            <h1 className="text-2xl font-bold">{district}</h1>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="demographics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Demografia</span>
            </TabsTrigger>
            <TabsTrigger value="economics" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Economia</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Educazione</span>
            </TabsTrigger>
            <TabsTrigger value="housing" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Abitazioni</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="demographics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Demografia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DataCard
                    title="Popolazione"
                    value={demographics?.population?.toLocaleString() || 'N/A'}
                  />
                  <DataCard
                    title="Età Media"
                    value={demographics?.median_age?.toString() || 'N/A'}
                  />
                  <DataCard
                    title="Distribuzione di Genere"
                    value={demographics?.gender_distribution?.male ? 
                      `${demographics.gender_distribution.male}% maschi, ${demographics.gender_distribution.female}% femmine` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Densità di Popolazione"
                    value={demographics?.population_density ? 
                      `${demographics.population_density} per km²` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Crescita della Popolazione"
                    value={demographics?.population_growth ? 
                      `${demographics.population_growth}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Households"
                    value={demographics?.households?.toLocaleString() || 'N/A'}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-8 mb-4">Distribuzione per Età</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {demographics?.age_distribution ? (
                    Object.entries(demographics.age_distribution).map(([range, percentage]) => (
                      <div key={range} className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-xs text-muted-foreground mb-1">{range} anni</div>
                        <div className="text-lg font-semibold">{percentage}%</div>
                      </div>
                    ))
                  ) : (
                    <div>Dati non disponibili</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="economics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Economia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DataCard
                    title="Reddito Medio"
                    value={economics?.median_income ? 
                      `$${economics.median_income.toLocaleString()}` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Tasso di Disoccupazione"
                    value={economics?.unemployment_rate ? 
                      `${economics.unemployment_rate}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Posti di Lavoro"
                    value={economics?.jobs?.toLocaleString() || 'N/A'}
                  />
                  <DataCard
                    title="Numero di Attività"
                    value={economics?.business_count?.toLocaleString() || 'N/A'}
                  />
                  <DataCard
                    title="Crescita Economica"
                    value={economics?.economic_growth ? 
                      `${economics.economic_growth}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Settore Principale"
                    value={economics?.main_industry || 'N/A'}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-8 mb-4">Distribuzione dei Settori</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {economics?.industry_distribution ? (
                    Object.entries(economics.industry_distribution).map(([industry, percentage]) => (
                      <div key={industry} className="flex justify-between items-center">
                        <span>{industry}</span>
                        <div className="flex items-center">
                          <div className="w-[200px] bg-muted rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>Dati non disponibili</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Educazione
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DataCard
                    title="Con Laurea"
                    value={education?.bachelor_degree ? 
                      `${education.bachelor_degree}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Con Diploma"
                    value={education?.high_school_diploma ? 
                      `${education.high_school_diploma}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Con Master o Dottorato"
                    value={education?.advanced_degree ? 
                      `${education.advanced_degree}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Scuole Pubbliche"
                    value={education?.public_schools?.toString() || 'N/A'}
                  />
                  <DataCard
                    title="Scuole Private"
                    value={education?.private_schools?.toString() || 'N/A'}
                  />
                  <DataCard
                    title="Università e College"
                    value={education?.universities?.toString() || 'N/A'}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-8 mb-4">Livello di Istruzione</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {education?.education_level_distribution ? (
                    Object.entries(education.education_level_distribution).map(([level, percentage]) => (
                      <div key={level} className="flex justify-between items-center">
                        <span>{level}</span>
                        <div className="flex items-center">
                          <div className="w-[200px] bg-muted rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>Dati non disponibili</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="housing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Abitazioni
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DataCard
                    title="Prezzo Medio Casa"
                    value={housing?.median_home_price ? 
                      `$${housing.median_home_price.toLocaleString()}` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Affitto Medio"
                    value={housing?.median_rent ? 
                      `$${housing.median_rent.toLocaleString()}/mese` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Unità Abitative"
                    value={housing?.housing_units?.toLocaleString() || 'N/A'}
                  />
                  <DataCard
                    title="Tasso di Proprietà"
                    value={housing?.ownership_rate ? 
                      `${housing.ownership_rate}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Tasso di Affitto"
                    value={housing?.rental_rate ? 
                      `${housing.rental_rate}%` : 
                      'N/A'}
                  />
                  <DataCard
                    title="Crescita Prezzi"
                    value={housing?.price_growth ? 
                      `${housing.price_growth}%` : 
                      'N/A'}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-8 mb-4">Tipologia di Abitazioni</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {housing?.housing_type_distribution ? (
                    Object.entries(housing.housing_type_distribution).map(([type, percentage]) => (
                      <div key={type} className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-xs text-muted-foreground mb-1">{type}</div>
                        <div className="text-lg font-semibold">{percentage}%</div>
                      </div>
                    ))
                  ) : (
                    <div>Dati non disponibili</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface DataCardProps {
  title: string;
  value: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value }) => {
  return (
    <div className="bg-muted/50 border rounded-lg p-4">
      <div className="text-sm text-muted-foreground mb-1">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
};

export default CensusDetail;
