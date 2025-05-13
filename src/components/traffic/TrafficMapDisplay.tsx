
import React, { useEffect, useRef, useState } from 'react';

interface TrafficMapDisplayProps {
  district: string;
  destination: string;
}

export const TrafficMapDisplay: React.FC<TrafficMapDisplayProps> = ({ district, destination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer | null>(null);

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
      }
      
      // Create the map
      const newMap = new google.maps.Map(mapRef.current, {
        zoom: 13,
        center: defaultCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Create TrafficLayer and add it to the map
      const newTrafficLayer = new google.maps.TrafficLayer();
      newTrafficLayer.setMap(newMap);

      setMap(newMap);
      setTrafficLayer(newTrafficLayer);
      
      console.log('Map initialized successfully with TrafficLayer');
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [map, district]);

  // Update center when district or destination changes
  useEffect(() => {
    if (!map || !window.google || !window.google.maps) {
      return;
    }

    try {
      let newCenter = map.getCenter();
      
      // Update center based on district
      if (district === "Miami Beach") {
        newCenter = new google.maps.LatLng(25.790654, -80.1300455);
      } else if (district === "Wynwood") {
        newCenter = new google.maps.LatLng(25.8049, -80.1937);
      } else if (district === "Brickell") {
        newCenter = new google.maps.LatLng(25.7602, -80.1959);
      }
      
      // If we have a destination, we could geocode it here to get coordinates
      // For now just focusing on the district

      map.setCenter(newCenter);
      
      console.log(`Map centered on ${district}`);
    } catch (error) {
      console.error('Error updating map center:', error);
    }
  }, [district, destination, map]);

  return (
    <div ref={mapRef} className="h-full w-full">
      {!district && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <p className="text-lg font-medium text-gray-700">
            Seleziona un quartiere per visualizzare il traffico
          </p>
        </div>
      )}
    </div>
  );
};
