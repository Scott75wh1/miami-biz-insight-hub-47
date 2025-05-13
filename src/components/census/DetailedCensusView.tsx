
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Chart, Database, Users, Home, Briefcase, GraduationCap } from 'lucide-react';
import { CensusDataResponse, fetchDistrictCensusData } from '@/services/api/censusService';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DetailedCensusView = () => {
  const { selectedDistrict } = useDistrictSelection();
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();
  const [censusData, setCensusData] = useState<CensusDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isUsingDemoKey = !apiKeys.censusGov || apiKeys.censusGov === 'demo-key';

  useEffect(() => {
    const loadCensusData = async () => {
      if (!isLoaded || !selectedDistrict) return;
      
      setIsLoading(true);
      
      try {
        const data = await fetchDistrictCensusData(apiKeys.censusGov, selectedDistrict);
        
        if (data) {
          setCensusData(data);
          
          toast({
            title: "Dati del distretto caricati",
            description: `I dati demografici per ${selectedDistrict} sono stati aggiornati.`,
          });
        }
      } catch (error) {
        console.error('Error fetching district census data:', error);
        toast({
          title: "Errore nel caricamento dei dati",
          description: "Non è stato possibile recuperare i dati del censimento per questo distretto.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCensusData();
  }, [selectedDistrict, apiKeys.censusGov, isLoaded, toast]);

  // Helper function to render a progress bar
  const renderProgressBar = (value: number, max: number = 100, color: string = 'bg-blue-500') => (
    <div className="h-2 w-full bg-muted rounded-full mt-1">
      <div 
        className={`h-full ${color} rounded-full`} 
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  // Helper function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5" />
          Dati del Censimento per {selectedDistrict}
        </CardTitle>
        <CardDescription>
          Dati demografici, economici e abitativi dettagliati
        </CardDescription>
        {isUsingDemoKey && (
          <Alert className="text-amber-800 bg-amber-50 border-amber-300 mt-4">
            <AlertDescription>
              I dati mostrati sono simulati a scopo dimostrativo. Inserisci un'API key reale nelle impostazioni per dati reali.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : censusData ? (
          <Tabs defaultValue="demographics" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="demographics">
                <Users className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Demografia</span>
              </TabsTrigger>
              <TabsTrigger value="education">
                <GraduationCap className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Istruzione</span>
              </TabsTrigger>
              <TabsTrigger value="housing">
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Abitazioni</span>
              </TabsTrigger>
              <TabsTrigger value="economy">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Economia</span>
              </TabsTrigger>
              <TabsTrigger value="overview">
                <Chart className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Sintesi</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="demographics" className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">{formatNumber(censusData.population)}</div>
                  <div className="text-sm text-muted-foreground">Popolazione</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">{censusData.median_age}</div>
                  <div className="text-sm text-muted-foreground">Età Mediana</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">${formatNumber(censusData.median_income)}</div>
                  <div className="text-sm text-muted-foreground">Reddito Mediano</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">{formatNumber(censusData.households)}</div>
                  <div className="text-sm text-muted-foreground">Nuclei Familiari</div>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Distribuzione per Età</h4>
              {censusData.demographics?.age_distribution && (
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between">
                      <span>Sotto i 18 anni</span>
                      <span>{censusData.demographics.age_distribution.under_18}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.age_distribution.under_18, 100, 'bg-blue-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>18-34 anni</span>
                      <span>{censusData.demographics.age_distribution.age_18_to_34}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.age_distribution.age_18_to_34, 100, 'bg-green-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>35-64 anni</span>
                      <span>{censusData.demographics.age_distribution.age_35_to_64}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.age_distribution.age_35_to_64, 100, 'bg-amber-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>65+ anni</span>
                      <span>{censusData.demographics.age_distribution.age_65_plus}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.age_distribution.age_65_plus, 100, 'bg-red-400')}
                  </div>
                </div>
              )}

              <h4 className="font-semibold mb-3">Distribuzione Etnica</h4>
              {censusData.demographics?.race_distribution && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between">
                      <span>Bianchi</span>
                      <span>{censusData.demographics.race_distribution.white}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.race_distribution.white, 100, 'bg-gray-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Afroamericani</span>
                      <span>{censusData.demographics.race_distribution.black}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.race_distribution.black, 100, 'bg-gray-600')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Asiatici</span>
                      <span>{censusData.demographics.race_distribution.asian}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.race_distribution.asian, 100, 'bg-yellow-500')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Ispanici</span>
                      <span>{censusData.demographics.race_distribution.hispanic}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.race_distribution.hispanic, 100, 'bg-orange-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Altri</span>
                      <span>{censusData.demographics.race_distribution.other}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.race_distribution.other, 100, 'bg-purple-400')}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="education" className="pt-4">
              <h4 className="font-semibold mb-4">Livelli di Istruzione</h4>
              {censusData.demographics?.education && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <span>Meno del diploma di scuola superiore</span>
                      <span>{censusData.demographics.education.less_than_high_school}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.education.less_than_high_school, 100, 'bg-red-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Diploma di scuola superiore</span>
                      <span>{censusData.demographics.education.high_school}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.education.high_school, 100, 'bg-amber-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Alcuni studi universitari</span>
                      <span>{censusData.demographics.education.some_college}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.education.some_college, 100, 'bg-blue-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Laurea triennale</span>
                      <span>{censusData.demographics.education.bachelors}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.education.bachelors, 100, 'bg-green-400')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Laurea magistrale o superiore</span>
                      <span>{censusData.demographics.education.graduate}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.education.graduate, 100, 'bg-purple-400')}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="housing" className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">${formatNumber(censusData.demographics?.housing?.median_home_value || 0)}</div>
                  <div className="text-sm text-muted-foreground">Valore Mediano Casa</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">{censusData.demographics?.housing?.vacancy_rate || 0}%</div>
                  <div className="text-sm text-muted-foreground">Tasso di Inoccupazione</div>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Proprietà degli Immobili</h4>
              {censusData.demographics?.housing && (
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between">
                      <span>Occupata dai proprietari</span>
                      <span>{censusData.demographics.housing.owner_occupied}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.housing.owner_occupied, 100, 'bg-blue-500')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Occupata da locatari</span>
                      <span>{censusData.demographics.housing.renter_occupied}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.housing.renter_occupied, 100, 'bg-amber-500')}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Vuota</span>
                      <span>{censusData.demographics.housing.vacancy_rate}%</span>
                    </div>
                    {renderProgressBar(censusData.demographics.housing.vacancy_rate, 100, 'bg-gray-500')}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="economy" className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">{censusData.demographics?.economic?.unemployment_rate || 0}%</div>
                  <div className="text-sm text-muted-foreground">Tasso di Disoccupazione</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-md">
                  <div className="text-lg font-semibold">{censusData.demographics?.economic?.poverty_rate || 0}%</div>
                  <div className="text-sm text-muted-foreground">Tasso di Povertà</div>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Economia Locale</h4>
              {censusData.demographics?.economic && (
                <div className="space-y-6 mb-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Numero di Imprese</span>
                      <span>{formatNumber(censusData.demographics.economic.business_count)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Attività commerciali registrate nel distretto
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Affitto Mediano</span>
                      <span>${formatNumber(censusData.demographics.economic.median_rent)}/mese</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Costo medio di locazione nel distretto
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Panoramica Demografica</h4>
                  <p className="text-sm mb-4">
                    Il distretto di {selectedDistrict} ha una popolazione di {formatNumber(censusData.population)} abitanti, 
                    con un'età mediana di {censusData.median_age} anni. La distribuzione etnica è 
                    prevalentemente {censusData.demographics?.race_distribution?.hispanic && censusData.demographics.race_distribution.hispanic > 30 ? "ispanica" : "varia"}, 
                    con un reddito mediano di ${formatNumber(censusData.median_income)} annui.
                  </p>

                  <h4 className="font-semibold mb-3">Tendenze Economiche</h4>
                  <p className="text-sm">
                    L'economia di {selectedDistrict} è caratterizzata da 
                    {censusData.demographics?.economic?.unemployment_rate && censusData.demographics.economic.unemployment_rate < 5 
                      ? " bassi livelli di disoccupazione" 
                      : " sfide occupazionali"}, 
                    con un tasso di disoccupazione del {censusData.demographics?.economic?.unemployment_rate || 0}%. 
                    Il distretto ospita circa {formatNumber(censusData.demographics?.economic?.business_count || 0)} attività commerciali.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Situazione Abitativa</h4>
                  <p className="text-sm mb-4">
                    Il valore mediano degli immobili in {selectedDistrict} è di ${formatNumber(censusData.demographics?.housing?.median_home_value || 0)}, 
                    con un tasso di occupazione da parte dei proprietari del {censusData.demographics?.housing?.owner_occupied || 0}%. 
                    Il costo mediano dell'affitto è di ${formatNumber(censusData.demographics?.economic?.median_rent || 0)} mensili.
                  </p>

                  <h4 className="font-semibold mb-3">Livello di Istruzione</h4>
                  <p className="text-sm">
                    Il {censusData.demographics?.education?.bachelors || 0 + (censusData.demographics?.education?.graduate || 0)}% dei residenti 
                    possiede almeno una laurea. Il {censusData.demographics?.education?.less_than_high_school || 0}% non ha completato 
                    la scuola superiore.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="py-8 text-center">
            <p>Nessun dato disponibile per questo distretto.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedCensusView;
