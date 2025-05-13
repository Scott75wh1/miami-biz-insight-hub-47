
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

interface District {
  name: string;
  lat: number;
  lng: number;
}

interface TrafficMapDisplayProps {
  district?: string;
}

const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  'Miami Beach': { lat: 25.790654, lng: -80.130045 },
  'Wynwood': { lat: 25.8050, lng: -80.1994 },
  'Brickell': { lat: 25.7617, lng: -80.1918 },
  'Downtown': { lat: 25.7743, lng: -80.1937 },
  'Little Havana': { lat: 25.7659, lng: -80.2149 },
  'Coral Gables': { lat: 25.7215, lng: -80.2684 },
  'Coconut Grove': { lat: 25.7313, lng: -80.2419 },
  'Design District': { lat: 25.8136, lng: -80.1953 }
};

const TrafficMapDisplay: React.FC<TrafficMapDisplayProps> = ({ district = 'Miami Beach' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);
  const { toast } = useToast();
  const { selectedDistrict } = useDistrictSelection();
  const [currentDistrict, setCurrentDistrict] = useState(district || selectedDistrict);

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
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Create traffic layer
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);
      trafficLayerRef.current = trafficLayer;
      
      // Add a marker for the district
      const marker = new window.google.maps.Marker({
        position: districtCoordinates[currentDistrict] || { lat: 25.790654, lng: -80.130045 },
        map: map,
        title: currentDistrict,
        animation: google.maps.Animation.DROP
      });
      markerRef.current = marker;
      
      // Add info window to the marker
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${currentDistrict}</strong><p>Dati di traffico in tempo reale</p></div>`
      });
      
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
      
      setMapInstance(map);
      
      toast({
        title: "Mappa del traffico caricata",
        description: `Visualizzazione del traffico per ${currentDistrict}`,
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Errore mappa",
        description: "Impossibile caricare la mappa del traffico",
        variant: "destructive",
      });
    }
  }, [mapInstance, currentDistrict, toast]);

  // Update map when district changes
  useEffect(() => {
    if (!mapInstance || !window.google || !markerRef.current) return;
    
    const newCoords = districtCoordinates[currentDistrict] || districtCoordinates['Miami Beach'];
    
    // Update marker position with animation
    markerRef.current.setPosition(newCoords);
    markerRef.current.setAnimation(google.maps.Animation.DROP);
    markerRef.current.setTitle(currentDistrict);
    
    // Center map on new district
    mapInstance.panTo(newCoords);
    
  }, [currentDistrict, mapInstance]);

  // Update local state when prop district changes
  useEffect(() => {
    if (district && district !== currentDistrict) {
      setCurrentDistrict(district);
    }
  }, [district]);

  return (
    <div ref={mapRef} className="h-full w-full rounded-md overflow-hidden" />
  );
};

export default TrafficMapDisplay;
