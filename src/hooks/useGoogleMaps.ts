
import { useState, useEffect, useRef } from 'react';
import { useApiKeys } from './useApiKeys';
import { useToast } from './use-toast';

interface GoogleMapsHookResult {
  mapLoaded: boolean;
  mapError: string | null;
  googleMapsScript: React.MutableRefObject<HTMLScriptElement | null>;
}

export function useGoogleMaps(): GoogleMapsHookResult {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const { apiKeys } = useApiKeys();
  const googleMapsScript = useRef<HTMLScriptElement | null>(null);
  const { toast } = useToast();

  // Load the Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        // Google Maps is already loaded
        console.log("Google Maps is already loaded");
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
        googleMapsScript.current.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlePlaces}&libraries=places&v=weekly`;
        googleMapsScript.current.async = true;
        googleMapsScript.current.defer = true;
        googleMapsScript.current.onload = () => {
          console.log('Google Maps script loaded successfully');
          setMapLoaded(true);
          toast({
            title: "Google Maps caricata",
            description: "La mappa è stata caricata correttamente"
          });
        };
        googleMapsScript.current.onerror = (e) => {
          console.error('Error loading Google Maps script:', e);
          setMapError("Impossibile caricare Google Maps. Verifica che la chiave API sia corretta.");
          toast({
            title: "Errore di caricamento",
            description: "Impossibile caricare Google Maps. Verifica la chiave API.",
            variant: "destructive"
          });
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
  }, [apiKeys.googlePlaces, toast]);

  return {
    mapLoaded,
    mapError,
    googleMapsScript
  };
}
