
/// <reference types="vite/client" />

// Google Maps API type definitions
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (mapDiv: Element, opts?: google.maps.MapOptions) => google.maps.Map;
        TrafficLayer: new (opts?: google.maps.TrafficLayerOptions) => google.maps.TrafficLayer;
        Geocoder: new () => google.maps.Geocoder;
        LatLng: new (lat: number, lng: number) => google.maps.LatLng;
        Marker: new (opts?: google.maps.MarkerOptions) => google.maps.Marker;
        InfoWindow: new (opts?: google.maps.InfoWindowOptions) => google.maps.InfoWindow;
        Animation: {
          DROP: number;
          BOUNCE: number;
        };
        GeocoderStatus: {
          OK: string;
          ZERO_RESULTS: string;
          OVER_DAILY_LIMIT: string;
          OVER_QUERY_LIMIT: string;
          REQUEST_DENIED: string;
          INVALID_REQUEST: string;
          UNKNOWN_ERROR: string;
        };
        MapTypeId: {
          ROADMAP: string;
          SATELLITE: string;
          HYBRID: string;
          TERRAIN: string;
        };
      }
    }
  }
}

namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    setOptions(options: MapOptions): void;
    fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
    getZoom(): number;
    getCenter(): LatLng;
    getBounds(): LatLngBounds;
    remove(): void;
  }

  class TrafficLayer {
    constructor(opts?: TrafficLayerOptions);
    setMap(map: Map | null): void;
    getMap(): Map | null;
    setOptions(options: TrafficLayerOptions): void;
  }

  class Geocoder {
    constructor();
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    constructor(sw?: LatLng, ne?: LatLng);
    extend(point: LatLng): LatLngBounds;
    getCenter(): LatLng;
    getSouthWest(): LatLng;
    getNorthEast(): LatLng;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    getMap(): Map | null;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    getPosition(): LatLng;
    setTitle(title: string): void;
    getTitle(): string;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    addListener(event: string, handler: Function): MapsEventListener;
    setAnimation(animation: any): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(options: InfoWindowOpenOptions): void;
    open(map?: Map, anchor?: Marker): void;
    close(): void;
    setContent(content: string | Node): void;
    getContent(): string | Node;
    setPosition(position: LatLng | LatLngLiteral): void;
    getPosition(): LatLng;
    setZIndex(zIndex: number): void;
    getZIndex(): number;
  }

  interface InfoWindowOpenOptions {
    map?: Map;
    anchor?: Marker;
  }

  interface MapsEventListener {
    remove(): void;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon | Symbol;
    label?: string | MarkerLabel;
    draggable?: boolean;
    clickable?: boolean;
    animation?: Animation;
    visible?: boolean;
    zIndex?: number;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    disableAutoPan?: boolean;
    maxWidth?: number;
    pixelOffset?: Size;
    position?: LatLng | LatLngLiteral;
    zIndex?: number;
  }

  interface MarkerLabel {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    text: string;
  }

  interface Icon {
    url: string;
    size?: Size;
    scaledSize?: Size;
    origin?: Point;
    anchor?: Point;
    labelOrigin?: Point;
  }

  interface Symbol {
    path: string | SymbolPath;
    fillColor?: string;
    fillOpacity?: number;
    scale?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  }

  enum SymbolPath {
    BACKWARD_CLOSED_ARROW,
    BACKWARD_OPEN_ARROW,
    CIRCLE,
    FORWARD_CLOSED_ARROW,
    FORWARD_OPEN_ARROW
  }

  interface Size {
    width: number;
    height: number;
    equals(other: Size): boolean;
  }

  interface Point {
    x: number;
    y: number;
    equals(other: Point): boolean;
  }

  type Animation = number;

  type GeocoderStatus = string;

  interface GeocoderRequest {
    address?: string;
    location?: LatLng | LatLngLiteral;
    placeId?: string;
    bounds?: LatLngBounds | LatLngBoundsLiteral;
    componentRestrictions?: GeocoderComponentRestrictions;
    region?: string;
  }

  interface GeocoderComponentRestrictions {
    route?: string;
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
    country?: string;
  }

  interface GeocoderResult {
    types: string[];
    formatted_address: string;
    address_components: GeocoderAddressComponent[];
    geometry: {
      location: LatLng;
      location_type: string;
      viewport: LatLngBounds;
      bounds?: LatLngBounds;
    };
    partial_match: boolean;
    place_id: string;
  }

  interface GeocoderAddressComponent {
    short_name: string;
    long_name: string;
    types: string[];
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    mapTypeId?: string;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    pitch?: number;
  }

  interface TrafficLayerOptions {
    autoRefresh?: boolean;
    map?: Map;
  }

  interface Padding {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }
}
