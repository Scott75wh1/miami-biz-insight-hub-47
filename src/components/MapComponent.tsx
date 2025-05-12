
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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
  const [customAddress, setCustomAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressSearching, setIsAddressSearching] = useState(false);
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();
  const [placesData, setPlacesData] = useState<PlaceData[] | null>(null);

  // Reset data when business type changes
  useEffect(() => {
    setPlacesData(null);
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
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      loadPlacesData(address);
      setIsAddressSearching(false);
    }, 500);
  };

  const loadPlacesData = async (location: string) => {
    try {
      setIsLoading(true);
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Ricerca - {getBusinessTypeQuery(businessType)}</span>
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
        <div className="p-4">
          {!customAddress ? (
            <div className="text-center p-4 text-muted-foreground">
              <p className="text-sm">Inserisci un indirizzo per visualizzare i dati di {getBusinessTypeQuery(businessType)}</p>
            </div>
          ) : !placesData ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Caricamento dati...</span>
            </div>
          ) : (
            <div className="mt-4 bg-white/80 p-3 rounded-md">
              <h4 className="font-medium mb-2 text-sm">Risultati per {customAddress}</h4>
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
      </CardContent>
    </Card>
  );
};

export default MapComponent;
