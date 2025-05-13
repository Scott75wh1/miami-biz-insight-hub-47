
import React from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { TrafficMapError } from './TrafficMapError';
import { TrafficMapLoading } from './TrafficMapLoading';
import { TrafficMapDisplay } from './TrafficMapDisplay';

interface TrafficMapProps {
  district: string;
  destination: string;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({ district, destination }) => {
  const { mapLoaded, mapError } = useGoogleMaps();
  
  if (mapError) {
    return <TrafficMapError error={mapError} />;
  }

  if (!mapLoaded) {
    return <TrafficMapLoading />;
  }

  return <TrafficMapDisplay district={district} destination={destination} />;
};
