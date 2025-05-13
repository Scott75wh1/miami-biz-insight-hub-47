
import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface TrafficMapDisplayProps {
  isLoaded: boolean;
  error: string | null;
  center?: { lat: number; lng: number };
  trafficEnabled: boolean;
}

const TrafficMapDisplay = ({
  isLoaded,
  error,
  center = { lat: 25.7617, lng: -80.1918 }, // Default to Miami
  trafficEnabled,
}: TrafficMapDisplayProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    try {
      // Initialize map
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.TERRAIN,
          ],
        },
      });

      // Add a marker for Miami
      new google.maps.Marker({
        position: center,
        map: googleMapRef.current,
        title: 'Miami',
        animation: google.maps.Animation.DROP,
      });

      // Create traffic layer but don't add it to the map yet
      trafficLayerRef.current = new google.maps.TrafficLayer();
      
      // Set initial traffic layer visibility
      if (trafficEnabled && googleMapRef.current) {
        trafficLayerRef.current.setMap(googleMapRef.current);
      } else if (trafficLayerRef.current) {
        trafficLayerRef.current.setMap(null);
      }

      // Add event listener for map click
      googleMapRef.current.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng && googleMapRef.current) {
          addMarker(event.latLng);
        }
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [isLoaded, center]);

  // Update traffic layer when trafficEnabled changes
  useEffect(() => {
    if (!isLoaded || !trafficLayerRef.current) return;

    if (trafficEnabled && googleMapRef.current) {
      trafficLayerRef.current.setMap(googleMapRef.current);
    } else {
      trafficLayerRef.current.setMap(null);
    }
  }, [trafficEnabled, isLoaded]);

  // Function to add marker on map click
  const addMarker = (location: google.maps.LatLng) => {
    if (!googleMapRef.current) return;

    const marker = new google.maps.Marker({
      position: location,
      map: googleMapRef.current,
      animation: google.maps.Animation.BOUNCE,
    });

    setTimeout(() => {
      marker.setAnimation(null);
    }, 2000);

    // Pan to the marker location
    if (googleMapRef.current) {
      googleMapRef.current.panTo(location);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-red-500 font-medium mb-2">Errore nella mappa</p>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Caricamento mappa in corso...</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[600px] rounded-lg shadow-md"
      style={{ minHeight: "400px" }}
    />
  );
};

export default TrafficMapDisplay;
