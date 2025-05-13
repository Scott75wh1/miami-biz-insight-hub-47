
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface TrafficMapDisplayProps {
  district: string;
}

export const TrafficMapDisplay: React.FC<TrafficMapDisplayProps> = ({ district }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer | null>(null);
  const { toast } = useToast();

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || map || !window.google || !window.google.maps) {
      return;
    }

    try {
      // Default coordinates for the selected district
      let defaultCenter = { lat: 25.7617, lng: -80.1918 }; // Default to Miami
      
      // Set center based on district if available
      if (district === "Miami Beach") {
        defaultCenter = { lat: 25.790654, lng: -80.1300455 };
      } else if (district === "Wynwood") {
        defaultCenter = { lat: 25.8049, lng: -80.1937 };
      } else if (district === "Brickell") {
        defaultCenter = { lat: 25.7602, lng: -80.1959 };
      } else if (district === "Downtown") {
        defaultCenter = { lat: 25.7742, lng: -80.1936 };
      } else if (district === "Little Havana") {
        defaultCenter = { lat: 25.7659, lng: -80.2273 };
      }
      
      // Create the map
      const newMap = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: defaultCenter,
        mapTypeId: "roadmap",
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Create TrafficLayer and add it to the map
      const newTrafficLayer = new window.google.maps.TrafficLayer();
      newTrafficLayer.setMap(newMap);

      setMap(newMap);
      setTrafficLayer(newTrafficLayer);
      
      toast({
        title: "Traffico visualizzato",
        description: `Visualizzazione del traffico in ${district}`,
      });
      
      console.log('Map initialized successfully with TrafficLayer');
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [map, district, toast]);

  // Update center when district changes
  useEffect(() => {
    if (!map || !window.google || !window.google.maps) {
      return;
    }

    try {
      let newCenter = map.getCenter();
      
      // Update center based on district
      if (district === "Miami Beach") {
        newCenter = new window.google.maps.LatLng(25.790654, -80.1300455);
      } else if (district === "Wynwood") {
        newCenter = new window.google.maps.LatLng(25.8049, -80.1937);
      } else if (district === "Brickell") {
        newCenter = new window.google.maps.LatLng(25.7602, -80.1959);
      } else if (district === "Downtown") {
        newCenter = new window.google.maps.LatLng(25.7742, -80.1936);
      } else if (district === "Little Havana") {
        newCenter = new window.google.maps.LatLng(25.7659, -80.2273);
      }
      
      map.setCenter(newCenter);
      
      console.log(`Map centered on ${district}`);
    } catch (error) {
      console.error('Error updating map center:', error);
    }
  }, [district, map]);

  return (
    <div className="relative">
      <div ref={mapRef} className="h-full w-full">
        {!district && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 z-10">
            <p className="text-lg font-medium text-gray-700">
              Seleziona un quartiere per visualizzare il traffico
            </p>
          </div>
        )}
      </div>
      
      <div className="absolute top-2 right-2 bg-white p-2 rounded shadow-md text-sm z-10">
        <p className="font-medium">Quartiere selezionato:</p>
        <p>{district}</p>
      </div>
    </div>
  );
};
