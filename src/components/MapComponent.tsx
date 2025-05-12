
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { BusinessType } from '@/components/BusinessTypeSelector';
import AddressInput from './AddressInput';
import PlaceResultsList from './places/PlaceResultsList';
import PlacesLoadingState from './places/PlacesLoadingState';
import { usePlacesData, getBusinessTypeQuery } from '@/hooks/usePlacesData';
import APILogDownloader from './APILogDownloader';

interface MapComponentProps {
  businessType: BusinessType;
  cuisineType?: string;
}

const MapComponent = ({ businessType, cuisineType }: MapComponentProps) => {
  const [customAddress, setCustomAddress] = useState<string | null>(null);
  const [isAddressSearching, setIsAddressSearching] = useState(false);
  const { apiKeys } = useApiKeys();
  const { placesData, isLoading, loadPlacesData } = usePlacesData(businessType, apiKeys.googlePlaces, cuisineType);

  const handleAddressSubmit = (address: string) => {
    setIsAddressSearching(true);
    setCustomAddress(address);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      loadPlacesData(address);
      setIsAddressSearching(false);
    }, 500);
  };

  // Get the proper title based on business type and cuisine type
  const getTitle = () => {
    const baseQuery = getBusinessTypeQuery(businessType);
    if (businessType === 'restaurant' && cuisineType) {
      return `Ricerca - ${baseQuery} (${cuisineType})`;
    }
    return `Ricerca - ${baseQuery}`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>{getTitle()}</span>
          {isLoading && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              <span>Caricamento...</span>
            </div>
          )}
          <div className="flex-shrink-0">
            <APILogDownloader />
          </div>
        </CardTitle>
        <div className="mt-2">
          <AddressInput onAddressSubmit={handleAddressSubmit} isLoading={isAddressSearching} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <PlacesLoadingState isLoading={isLoading} customAddress={customAddress} />
          {customAddress && placesData && !isLoading && (
            <PlaceResultsList places={placesData} address={customAddress} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
