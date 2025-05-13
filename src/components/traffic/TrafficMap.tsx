
import React, { useEffect, useRef, useState } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsDialog } from '@/components/SettingsDialog';

interface TrafficMapProps {
  district: string;
  destination: string;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({ district, destination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const { apiKeys } = useApiKeys();
  
  // Declare types for Google Maps script
  const googleMapsScript = useRef<HTMLScriptElement | null>(null);

  // Load the Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        // Google Maps is already loaded
        setMapLoaded(true);
        return;
      }

      // Reset previous errors
      setMapError(null);

      // Check if using demo key
      if (!apiKeys.googlePlaces || apiKeys.googlePlaces === 'demo-key') {
        setMapError("È necessaria una API key valida di Google Maps. Per favore, configura una chiave API nelle impostazioni.");
        return;
      }

      // Create the script element if it doesn't exist
      if (!googleMapsScript.current) {
        googleMapsScript.current = document.createElement('script');
        googleMapsScript.current.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlePlaces}&libraries=places&loading=async`;
        googleMapsScript.current.async = true;
        googleMapsScript.current.defer = true;
        googleMapsScript.current.onload = () => {
          console.log('Google Maps script loaded successfully');
          setMapLoaded(true);
        };
        googleMapsScript.current.onerror = (e) => {
          console.error('Error loading Google Maps script:', e);
          setMapError("Impossibile caricare Google Maps. Verifica che la chiave API sia corretta.");
        };
        document.head.appendChild(googleMapsScript.current);
      }
    };

    loadGoogleMaps();

    // Cleanup function
    return () => {
      if (googleMapsScript.current && document.head.contains(googleMapsScript.current)) {
        document.head.removeChild(googleMapsScript.current);
      }
    };
  }, [apiKeys.googlePlaces]);

  // Initialize the map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || map || !window.google || !window.google.maps) {
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
      setMapError("Errore durante l'inizializzazione della mappa. Ricarica la pagina o verifica la configurazione.");
    }
  }, [mapLoaded, map, district]);

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

  if (mapError) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Errore di caricamento della mappa</h3>
        <p className="text-muted-foreground mb-6">{mapError}</p>
        <div className="flex gap-4">
          <Button onClick={() => window.location.reload()} variant="outline">
            Ricarica pagina
          </Button>
          <SettingsDialog />
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          È necessaria una chiave API valida di Google Maps per visualizzare la mappa.
          Vai su Impostazioni per configurare la tua chiave API.
        </p>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Caricamento della mappa...</span>
      </div>
    );
  }

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
