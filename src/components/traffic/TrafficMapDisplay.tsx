
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface TrafficMapDisplayProps {
  district: string;
  destination: string;
}

export const TrafficMapDisplay: React.FC<TrafficMapDisplayProps> = ({ district, destination }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [trafficLayer, setTrafficLayer] = useState<google.maps.TrafficLayer | null>(null);
  const [searchMarker, setSearchMarker] = useState<google.maps.Marker | null>(null);
  const [searchTime, setSearchTime] = useState<string>('');
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
      }
      
      // Create the map - making sure we're instantiating it correctly
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
      
      console.log('Map initialized successfully with TrafficLayer');
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [map, district]);

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
      }
      
      map.setCenter(newCenter);
      
      console.log(`Map centered on ${district}`);
    } catch (error) {
      console.error('Error updating map center:', error);
    }
  }, [district, map]);

  // Handle destination search
  useEffect(() => {
    if (!map || !destination || !window.google || !window.google.maps) {
      return;
    }

    // Remove previous marker if exists
    if (searchMarker) {
      searchMarker.setMap(null);
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address: destination }, (results, status) => {
        // Fixed: Use full path to GeocoderStatus
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          
          // Set the current timestamp
          const now = new Date();
          const formattedTime = now.toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          setSearchTime(formattedTime);
          
          // Center and zoom the map
          map.setCenter(location);
          map.setZoom(15);
          
          // Fixed: Use full path to Animation
          const newMarker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: destination,
            animation: window.google.maps.Animation.DROP
          });
          
          // Create an info window with the timestamp
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                <h4 style="margin:0;padding:0;font-weight:bold;">${destination}</h4>
                <p style="margin:5px 0 0;padding:0;font-size:0.9em;">Analisi traffico: ${formattedTime}</p>
              </div>
            `
          });
          
          // Open the info window on click
          newMarker.addListener('click', function() {
            infoWindow.open({
              map: map,
              anchor: newMarker
            });
          });
          
          // Open info window initially
          infoWindow.open({
            map: map,
            anchor: newMarker
          });
          
          setSearchMarker(newMarker);
          
          toast({
            title: "Indirizzo trovato",
            description: `Visualizzazione traffico per: ${destination}`,
          });
        } else {
          console.error('Geocode error:', status);
          toast({
            title: "Indirizzo non trovato",
            description: "Impossibile trovare l'indirizzo specificato.",
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      console.error('Error in address search:', error);
      toast({
        title: "Errore nella ricerca",
        description: "Si è verificato un errore durante la ricerca dell'indirizzo.",
        variant: "destructive",
      });
    }
  }, [destination, map, toast, searchMarker]);

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
      
      {searchTime && (
        <div className="absolute top-2 right-2 bg-white p-2 rounded shadow-md text-sm z-10">
          <p className="font-medium">Ultima ricerca:</p>
          <p>{searchTime}</p>
        </div>
      )}
    </div>
  );
};
