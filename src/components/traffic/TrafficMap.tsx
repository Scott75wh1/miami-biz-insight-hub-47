
import React, { useEffect, useRef, useState } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Loader2 } from 'lucide-react';
import { TrafficRouteData } from '@/services/api/traffic/types';

interface TrafficMapProps {
  district: string;
  destination: string;
  trafficData: TrafficRouteData | null;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({ district, destination, trafficData }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const { apiKeys } = useApiKeys();

  // Load the Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google || !window.google.maps) {
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlePlaces}&libraries=places`;
        googleMapsScript.async = true;
        googleMapsScript.defer = true;
        googleMapsScript.onload = () => setMapLoaded(true);
        document.head.appendChild(googleMapsScript);
      } else {
        setMapLoaded(true);
      }
    };

    loadGoogleMaps();
  }, [apiKeys.googlePlaces]);

  // Initialize the map
  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // Miami coordinates as default
      const miamiCoords = { lat: 25.7617, lng: -80.1918 };
      
      // Create the map
      const newMap = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: miamiCoords,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Create the directions renderer
      const newDirectionsRenderer = new google.maps.DirectionsRenderer({
        map: newMap,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#3b82f6',
          strokeWeight: 5,
        },
      });

      setMap(newMap);
      setDirectionsRenderer(newDirectionsRenderer);
    }
  }, [mapLoaded, map]);

  // Update the directions when traffic data changes
  useEffect(() => {
    if (map && directionsRenderer && trafficData && trafficData.routes) {
      // Convert encoded polyline to directions result
      const directionsResult: google.maps.DirectionsResult = {
        routes: trafficData.routes.map(route => ({
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(route.bounds.southwest.lat, route.bounds.southwest.lng),
            new google.maps.LatLng(route.bounds.northeast.lat, route.bounds.northeast.lng),
          ),
          legs: route.legs.map(leg => ({
            distance: { text: leg.distance.text, value: leg.distance.value },
            duration: { text: leg.duration.text, value: leg.duration.value },
            duration_in_traffic: { text: leg.duration_in_traffic.text, value: leg.duration_in_traffic.value },
            end_address: leg.end_address,
            start_address: leg.start_address,
            end_location: new google.maps.LatLng(leg.end_location.lat, leg.end_location.lng),
            start_location: new google.maps.LatLng(leg.start_location.lat, leg.start_location.lng),
            steps: leg.steps.map(step => ({
              distance: { text: step.distance.text, value: step.distance.value },
              duration: { text: step.duration.text, value: step.duration.value },
              end_location: new google.maps.LatLng(step.end_location.lat, step.end_location.lng),
              start_location: new google.maps.LatLng(step.start_location.lat, step.start_location.lng),
              instructions: step.html_instructions,
              travel_mode: step.travel_mode as google.maps.TravelMode,
            })),
          })),
          overview_path: route.overview_polyline.points.split('').map((_, i, arr) => {
            // This is a simplified representation since Google Maps API uses a complex algorithm
            // to decode polyline points
            return new google.maps.LatLng(0, 0); 
          }),
          overview_polyline: { points: route.overview_polyline.points },
          warnings: route.warnings,
          waypoint_order: route.waypoint_order,
        })),
        request: {} as any,
      };

      directionsRenderer.setDirections(directionsResult);
      
      // Fit the map to the bounds of the route
      if (directionsResult.routes[0]?.bounds) {
        map.fitBounds(directionsResult.routes[0].bounds);
      }
    }
  }, [trafficData, map, directionsRenderer]);

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
      {!district && !destination && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <p className="text-lg font-medium text-gray-700">
            Seleziona un quartiere e una destinazione per visualizzare il traffico
          </p>
        </div>
      )}
    </div>
  );
};
