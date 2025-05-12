
import React, { useEffect, useState } from 'react';
import { Map as MapIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { fetchPlacesData } from '@/services/apiService';
import AddressInput from './AddressInput';

interface MapComponentProps {
  businessType: BusinessType;
}

interface PlaceData {
  name: string;
  vicinity: string;
  rating: number;
}

const MapComponent = ({ businessType }: MapComponentProps) => {
  const miamiDistricts = ['Downtown', 'Brickell', 'Wynwood', 'Little Havana', 'Miami Beach'];
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [customAddress, setCustomAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressSearching, setIsAddressSearching] = useState(false);
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();
  const [placesData, setPlacesData] = useState<PlaceData[] | null>(null);

  // Reset data when business type changes
  useEffect(() => {
    setPlacesData(null);
    setSelectedDistrict(null);
    setCustomAddress(null);
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

  const handleAddressSubmit = (address: string) => {
    setIsAddressSearching(true);
    setCustomAddress(address);
    setSelectedDistrict(null); // Reset district when using custom address
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      loadPlacesData(address);
      setIsAddressSearching(false);
    }, 500);
  };

  // Load data when district or custom address changes
  useEffect(() => {
    if ((!selectedDistrict && !customAddress) || !isLoaded) return;
    
    setIsLoading(true);
    
    const location = selectedDistrict 
      ? `${selectedDistrict}, Miami, FL` 
      : customAddress || 'Miami, FL';
    
    loadPlacesData(location);
  }, [selectedDistrict, businessType, apiKeys.googlePlaces, isLoaded]);

  const loadPlacesData = async (location: string) => {
    try {
      const searchQuery = `${getBusinessTypeQuery(businessType)} near ${location} within 2 miles`;
      console.log(`Loading places data with query: ${searchQuery}`);
      
      const data = await fetchPlacesData(searchQuery, apiKeys.googlePlaces, location);
      
      if (data && data.results) {
        // Map the API response to our PlaceData interface
        const mappedData = data.results.map((place: any) => ({
          name: place.name,
          vicinity: place.vicinity || place.formatted_address || `${location}`,
          rating: place.rating || 0,
        }));
        
        setPlacesData(mappedData);
        
        toast({
          title: "Dati del luogo caricati",
          description: `Mostrando dati di ${getBusinessTypeQuery(businessType)} per ${location}`,
        });
      } else {
        // Fall back to mock data if the API doesn't return results
        const mockData: PlaceData[] = [
          { name: `${getBusinessTypeQuery(businessType)} 1 in ${location}`, vicinity: `${location} Ave 123`, rating: 4.5 },
          { name: `${getBusinessTypeQuery(businessType)} 2 in ${location}`, vicinity: `${location} St 456`, rating: 4.2 },
          { name: `${getBusinessTypeQuery(businessType)} 3 in ${location}`, vicinity: `${location} Blvd 789`, rating: 4.7 },
        ];
        
        setPlacesData(mockData);
        
        toast({
          title: "Dati simulati caricati",
          description: `L'API non ha restituito risultati, mostrando dati simulati per ${location}`,
        });
      }
    } catch (error) {
      console.error('Error fetching places data:', error);
      
      // Fall back to mock data on error
      const mockData: PlaceData[] = [
        { name: `${getBusinessTypeQuery(businessType)} 1 in ${location}`, vicinity: `${location} Ave 123`, rating: 4.5 },
        { name: `${getBusinessTypeQuery(businessType)} 2 in ${location}`, vicinity: `${location} St 456`, rating: 4.2 },
        { name: `${getBusinessTypeQuery(businessType)} 3 in ${location}`, vicinity: `${location} Blvd 789`, rating: 4.7 },
      ];
      
      setPlacesData(mockData);
      
      toast({
        title: "Errore nel caricamento dei dati",
        description: "Controlla la tua API key di Google Places. Mostrando dati simulati.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistrictClick = (district: string) => {
    setCustomAddress(null); // Reset custom address when selecting district
    setSelectedDistrict(district);
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
        <div className="mt-2">
          <AddressInput onAddressSubmit={handleAddressSubmit} isLoading={isAddressSearching} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] bg-miami-blue/10 rounded-md flex items-center justify-center">
          {/* Placeholder per la mappa interattiva */}
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <MapIcon className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {customAddress 
                ? `Visualizzazione ${getBusinessTypeQuery(businessType)} vicino a ${customAddress} (raggio: 2 miglia)`
                : selectedDistrict 
                  ? `Visualizzazione ${getBusinessTypeQuery(businessType)} per ${selectedDistrict}`
                  : `Seleziona un quartiere di Miami o inserisci un indirizzo per visualizzare i dati di ${getBusinessTypeQuery(businessType)}`}
            </p>
            {placesData && (
              <div className="mt-4 text-left bg-white/80 p-3 rounded-md max-w-sm mx-auto">
                <h4 className="font-medium mb-2 text-sm">Risultati per {customAddress || selectedDistrict}</h4>
                <ul className="space-y-2 text-sm">
                  {placesData.map((place, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <div className="font-medium">{place.name}</div>
                      <div className="text-xs text-muted-foreground">{place.vicinity}</div>
                      <div className="text-xs">Rating: {place.rating}/5</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4">
          {miamiDistricts.map((district) => (
            <button
              key={district}
              type="button"
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
