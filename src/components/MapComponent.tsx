
import React, { useEffect, useState } from 'react';
import { Map as MapIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchPlacesData } from '@/services/apiService';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';

interface MapComponentProps {
  businessType: BusinessType;
}

const MapComponent = ({ businessType }: MapComponentProps) => {
  const miamiDistricts = ['Downtown', 'Brickell', 'Wynwood', 'Little Havana', 'Miami Beach'];
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { toast } = useToast();
  const [dataAttempted, setDataAttempted] = useState(false);
  const [placesData, setPlacesData] = useState<any>(null);

  // Reset data attempted when business type changes
  useEffect(() => {
    setDataAttempted(false);
    setPlacesData(null);
  }, [businessType]);

  const getBusinessTypeQuery = (type: BusinessType) => {
    switch (type) {
      case 'restaurant':
        return 'restaurants';
      case 'coffee_shop':
        return 'coffee shops';
      case 'retail':
        return 'retail shops';
      case 'tech':
        return 'tech companies';
      case 'fitness':
        return 'fitness centers';
      default:
        return 'businesses';
    }
  };

  useEffect(() => {
    const loadMapData = async () => {
      if (!selectedDistrict || !isLoaded || !areKeysSet() || dataAttempted) return;
      
      setIsLoading(true);
      setDataAttempted(true);
      
      try {
        const businessQuery = `${getBusinessTypeQuery(businessType)} in ${selectedDistrict}`;
        const data = await fetchPlacesData(businessQuery, apiKeys.googlePlaces, 'Miami, FL');
        
        if (data) {
          setPlacesData(data);
          toast({
            title: "Dati del distretto caricati",
            description: `Mostrando dati di ${getBusinessTypeQuery(businessType)} per ${selectedDistrict}`,
          });
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
        toast({
          title: "Errore nel caricamento dei dati",
          description: "Impossibile recuperare i dati da Google Places. Controlla la tua API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedDistrict) {
      loadMapData();
    }
  }, [selectedDistrict, isLoaded, apiKeys.googlePlaces, toast, areKeysSet, dataAttempted, businessType]);

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    setDataAttempted(false);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Mappa di Miami - {getBusinessTypeQuery(businessType)}</span>
          {isLoading && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              <span>Caricamento...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] bg-miami-blue/10 rounded-md flex items-center justify-center">
          {/* Placeholder per la mappa interattiva (da integrare con una vera API di mappe) */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <MapIcon className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedDistrict 
                ? `Visualizzazione ${getBusinessTypeQuery(businessType)} per ${selectedDistrict}`
                : `Seleziona un quartiere di Miami per visualizzare i dati di ${getBusinessTypeQuery(businessType)}`}
            </p>
            {placesData && (
              <div className="mt-4 text-xs">
                <p>Dati caricati correttamente</p>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4">
          {miamiDistricts.map((district) => (
            <button
              key={district}
              className={`text-xs py-1.5 px-2.5 rounded-full transition-colors ${
                selectedDistrict === district
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
              }`}
              onClick={() => handleDistrictClick(district)}
            >
              {district}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
