
import { TrafficRouteData } from './types';

export const generateMockTrafficData = (origin: string, destination: string, mode: string): TrafficRouteData => {
  // Create mock locations based on origin and destination
  const originCoords = getMockCoordinates(origin);
  const destCoords = getMockCoordinates(destination);
  
  // Calculate mock distance and duration based on coordinates
  const distance = calculateDistance(originCoords.lat, originCoords.lng, destCoords.lat, destCoords.lng);
  const duration = calculateDuration(distance, mode);
  const durationInTraffic = duration * getTrafficMultiplier();
  
  return {
    routes: [
      {
        bounds: {
          northeast: {
            lat: Math.max(originCoords.lat, destCoords.lat) + 0.01,
            lng: Math.max(originCoords.lng, destCoords.lng) + 0.01,
          },
          southwest: {
            lat: Math.min(originCoords.lat, destCoords.lat) - 0.01,
            lng: Math.min(originCoords.lng, destCoords.lng) - 0.01,
          }
        },
        legs: [
          {
            distance: {
              text: `${(distance).toFixed(1)} km`,
              value: distance * 1000, // convert to meters
            },
            duration: {
              text: formatDuration(duration),
              value: duration * 60, // convert to seconds
            },
            duration_in_traffic: {
              text: formatDuration(durationInTraffic),
              value: durationInTraffic * 60, // convert to seconds
            },
            end_address: destination,
            end_location: destCoords,
            start_address: origin,
            start_location: originCoords,
            steps: generateMockSteps(originCoords, destCoords, distance, duration),
          }
        ],
        overview_polyline: {
          points: generateMockPolyline(originCoords, destCoords),
        },
        warnings: [],
        waypoint_order: [],
      }
    ],
    status: 'OK',
  };
};

// Helper functions for mock data generation
function getMockCoordinates(location: string): { lat: number, lng: number } {
  // Return specific coordinates for known Miami locations
  const locationMap: Record<string, { lat: number, lng: number }> = {
    'Miami Beach': { lat: 25.7907, lng: -80.1300 },
    'Wynwood': { lat: 25.8050, lng: -80.1994 },
    'Brickell': { lat: 25.7617, lng: -80.1918 },
    'Little Havana': { lat: 25.7743, lng: -80.2089 },
    'Coral Gables': { lat: 25.7215, lng: -80.2684 },
    'Downtown Miami': { lat: 25.7742, lng: -80.1936 },
    'Key Biscayne': { lat: 25.6891, lng: -80.1628 },
    'South Beach': { lat: 25.7825, lng: -80.1340 },
  };
  
  // Try to find the location in our map
  for (const [key, coords] of Object.entries(locationMap)) {
    if (location.includes(key)) {
      return coords;
    }
  }
  
  // Default to random coordinates around Miami if location not found
  return {
    lat: 25.7617 + (Math.random() * 0.1 - 0.05),
    lng: -80.1918 + (Math.random() * 0.1 - 0.05),
  };
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Simple Euclidean distance approximation (not accurate for real world, but good for mock data)
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

function calculateDuration(distance: number, mode: string): number {
  // Calculate approximate duration in minutes
  switch (mode) {
    case 'walking':
      return distance * 12; // Assume 5 km/h walking speed
    case 'bicycling':
      return distance * 4; // Assume 15 km/h cycling speed
    case 'transit':
      return distance * 3; // Assume 20 km/h transit speed
    default: // driving
      return distance * 2; // Assume 30 km/h driving speed
  }
}

function getTrafficMultiplier(): number {
  // Random traffic condition between 1.0 (no traffic) and 2.0 (heavy traffic)
  return 1.0 + Math.random();
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hours > 0) {
    return `${hours} ore ${mins} min`;
  } else {
    return `${mins} min`;
  }
}

function generateMockSteps(
  origin: { lat: number, lng: number }, 
  destination: { lat: number, lng: number },
  distance: number,
  duration: number
) {
  const steps = [];
  const numSteps = Math.floor(Math.random() * 3) + 2; // 2-4 steps
  
  for (let i = 0; i < numSteps; i++) {
    const stepFraction = 1 / numSteps;
    const startFraction = i * stepFraction;
    const endFraction = (i + 1) * stepFraction;
    
    const startLat = origin.lat + (destination.lat - origin.lat) * startFraction;
    const startLng = origin.lng + (destination.lng - origin.lng) * startFraction;
    const endLat = origin.lat + (destination.lat - origin.lat) * endFraction;
    const endLng = origin.lng + (destination.lng - origin.lng) * endFraction;
    
    const stepDistance = distance * stepFraction;
    const stepDuration = duration * stepFraction;
    
    steps.push({
      distance: {
        text: `${stepDistance.toFixed(1)} km`,
        value: stepDistance * 1000,
      },
      duration: {
        text: formatDuration(stepDuration),
        value: stepDuration * 60,
      },
      end_location: {
        lat: endLat,
        lng: endLng,
      },
      html_instructions: getRandomInstruction(i, numSteps),
      start_location: {
        lat: startLat,
        lng: startLng,
      },
      travel_mode: 'DRIVING',
    });
  }
  
  return steps;
}

function getRandomInstruction(stepIndex: number, totalSteps: number): string {
  const streets = ['Biscayne Blvd', 'Collins Ave', 'Ocean Dr', 'Brickell Ave', 'SW 8th St', 'NW 2nd Ave'];
  const directions = ['nord', 'sud', 'est', 'ovest'];
  
  if (stepIndex === 0) {
    return `Procedi verso ${directions[Math.floor(Math.random() * directions.length)]} su ${streets[Math.floor(Math.random() * streets.length)]}`;
  } else if (stepIndex === totalSteps - 1) {
    return `Arrivo a destinazione`;
  } else {
    return `Gira su ${streets[Math.floor(Math.random() * streets.length)]} e continua per ${Math.floor(Math.random() * 5) + 1} km`;
  }
}

function generateMockPolyline(origin: { lat: number, lng: number }, destination: { lat: number, lng: number }): string {
  // This is a simplified mock that doesn't actually encode the polyline
  // In a real implementation, this would use the Google polyline algorithm
  
  // Just return a dummy string with the right length based on distance
  const distance = calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
  return 'A'.repeat(Math.round(distance * 10));
}
