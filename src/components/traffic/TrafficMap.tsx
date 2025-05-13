
import React, { useState } from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import TrafficMapDisplay from './TrafficMapDisplay';
import { TrafficMapLoading } from './TrafficMapLoading';
import { TrafficMapError } from './TrafficMapError';

interface TrafficMapProps {
  district: string;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({ district }) => {
  const { mapLoaded, mapError } = useGoogleMaps();
  const [trafficEnabled] = useState<boolean>(true);

  // We could add geo-coding for the district, but for now we'll use Miami coordinates
  const getDistrictCoordinates = () => {
    // In a real app, you would geocode the district name to get coordinates
    return { lat: 25.7617, lng: -80.1918 }; // Default Miami coordinates
  };

  if (mapError) {
    return <TrafficMapError errorMessage={mapError} />;
  }

  if (!mapLoaded) {
    return <TrafficMapLoading />;
  }

  return (
    <TrafficMapDisplay 
      isLoaded={mapLoaded} 
      error={mapError}
      center={getDistrictCoordinates()}
      trafficEnabled={trafficEnabled}
    />
  );
};
