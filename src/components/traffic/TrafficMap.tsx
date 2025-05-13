
import React from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import TrafficMapDisplay from './TrafficMapDisplay';
import { TrafficMapLoading } from './TrafficMapLoading';
import { TrafficMapError } from './TrafficMapError';

interface TrafficMapProps {
  district: string;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({ district }) => {
  const { mapLoaded, mapError } = useGoogleMaps();

  if (mapError) {
    return <TrafficMapError errorMessage={mapError} />;
  }

  if (!mapLoaded) {
    return <TrafficMapLoading />;
  }

  return <TrafficMapDisplay district={district} />;
};
