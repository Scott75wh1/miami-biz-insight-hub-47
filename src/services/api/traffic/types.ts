
export interface TrafficLocation {
  lat: number;
  lng: number;
}

export interface TrafficRoute {
  bounds: {
    northeast: TrafficLocation;
    southwest: TrafficLocation;
  };
  legs: TrafficLeg[];
  overview_polyline: {
    points: string;
  };
  warnings: string[];
  waypoint_order: number[];
}

export interface TrafficLeg {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  duration_in_traffic: {
    text: string;
    value: number;
  };
  end_address: string;
  end_location: TrafficLocation;
  start_address: string;
  start_location: TrafficLocation;
  steps: TrafficStep[];
}

export interface TrafficStep {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  end_location: TrafficLocation;
  html_instructions: string;
  start_location: TrafficLocation;
  travel_mode: string;
}

export interface TrafficRouteData {
  routes: TrafficRoute[];
  status: string;
}

export interface TrafficAnalysisData {
  averageSpeed: number;
  congestionLevel: 'low' | 'moderate' | 'high' | 'severe';
  travelTimeMinutes: number;
  distanceKm: number;
}
