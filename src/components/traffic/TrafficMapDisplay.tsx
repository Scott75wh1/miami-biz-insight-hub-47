
import React, { useRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define Maps types more explicitly to help TypeScript
declare global {
  interface Window {
    google: {
      maps: {
        Map: typeof google.maps.Map;
        Marker: typeof google.maps.Marker;
        TrafficLayer: typeof google.maps.TrafficLayer;
        MapTypeId: {
          ROADMAP: google.maps.MapTypeId;
          SATELLITE: google.maps.MapTypeId;
          HYBRID: google.maps.MapTypeId;
          TERRAIN: google.maps.MapTypeId;
        };
        Animation: {
          DROP: google.maps.Animation.DROP;
          BOUNCE: google.maps.Animation.BOUNCE;
        };
      };
    };
  }
}

interface TrafficMapDisplayProps {
  district?: string;
}

const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  'Brickell': { lat: 25.7617, lng: -80.1918 },
  'Downtown': { lat: 25.7742, lng: -80.1936 },
  'Wynwood': { lat: 25.8049, lng: -80.1985 },
  'Miami Beach': { lat: 25.790654, lng: -80.130045 },
  'Little Havana': { lat: 25.7742, lng: -80.2194 },
  'Coconut Grove': { lat: 25.7313, lng: -80.2455 },
  'Design District': { lat: 25.8136, lng: -80.1953 }
};

const TrafficMapDisplay: React.FC<TrafficMapDisplayProps> = ({ district = 'Miami Beach' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);
  const { toast } = useToast();
  
  const currentDistrict = district || 'Miami Beach';

  // Initialize map when component mounts
  useEffect(() => {
    if (!window.google || mapInstance || !mapRef.current) return;

    try {
      const mapOptions = {
        center: districtCoordinates[currentDistrict] || { lat: 25.790654, lng: -80.130045 },
        zoom: 14,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      };
      
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      setMapInstance(map);
      
      // Add traffic layer
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);
      trafficLayerRef.current = trafficLayer;
      
      // Add marker for the district
      const marker = new window.google.maps.Marker({
        position: districtCoordinates[currentDistrict] || { lat: 25.790654, lng: -80.130045 },
        map: map,
        title: currentDistrict,
        animation: window.google.maps.Animation.DROP
      });
      markerRef.current = marker;
      
      // Notify when map is ready
      map.addListener('tilesloaded', () => {
        if (map.getZoom() !== undefined) {
          toast({
            title: "Mappa Traffico Caricata",
            description: `Visualizzazione del traffico per ${currentDistrict}`,
          });
        }
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Errore Mappa",
        description: "Impossibile inizializzare la mappa del traffico",
        variant: "destructive",
      });
    }
  }, [mapInstance, currentDistrict, toast]);

  // Update map when district changes
  useEffect(() => {
    if (!mapInstance || !markerRef.current || district === currentDistrict) return;
    
    const newCoords = districtCoordinates[district] || districtCoordinates['Miami Beach'];
    
    // Update marker position with animation
    markerRef.current.setPosition(newCoords);
    markerRef.current.setAnimation(window.google.maps.Animation.DROP);
    markerRef.current.setTitle(district);
    
    // Center map on new district
    mapInstance.setCenter(newCoords);
    
    // Show toast for district change
    toast({
      title: "Cambio Zona",
      description: `Visualizzazione del traffico per ${district}`,
      variant: "default",
    });
  }, [district, mapInstance, toast]);

  return (
    <div ref={mapRef} className="h-full w-full rounded-md overflow-hidden" />
  );
};

export default TrafficMapDisplay;
