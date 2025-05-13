/// <reference types="vite/client" />

// Google Maps API type definitions
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setOptions(options: MapOptions): void;
      fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
      getZoom(): number;
      getCenter(): LatLng;
      easeTo(options: { center: LatLng | LatLngLiteral; duration: number; easing: (n: number) => number }): void;
      addControl(control: Control, position?: ControlPosition): void;
      getBounds(): LatLngBounds;
      scrollZoom: { disable(): void; enable(): void };
      on(event: string, callback: Function): void;
      setFog(options: any): void;
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

    enum GeocoderStatus {
      OK = "OK",
      ZERO_RESULTS = "ZERO_RESULTS",
      OVER_DAILY_LIMIT = "OVER_DAILY_LIMIT",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      INVALID_REQUEST = "INVALID_REQUEST",
      UNKNOWN_ERROR = "UNKNOWN_ERROR"
    }

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
      open(map?: Map, anchor?: MVCObject): void;
      close(): void;
      setContent(content: string | Node): void;
      getContent(): string | Node;
      setPosition(position: LatLng | LatLngLiteral): void;
      getPosition(): LatLng;
      setZIndex(zIndex: number): void;
      getZIndex(): number;
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

    enum Animation {
      BOUNCE,
      DROP
    }

    interface MapsEventListener {
      remove(): void;
    }

    class MVCObject {
      addListener(eventName: string, handler: Function): MapsEventListener;
      bindTo(key: string, target: MVCObject, targetKey?: string): void;
      get(key: string): any;
      notify(key: string): void;
      set(key: string, value: any): void;
      setValues(values: any): void;
      unbind(key: string): void;
      unbindAll(): void;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
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

    interface ControlPosition {
      TOP_LEFT: number;
      TOP_CENTER: number;
      TOP_RIGHT: number;
      LEFT_TOP: number;
      LEFT_CENTER: number;
      LEFT_BOTTOM: number;
      RIGHT_TOP: number;
      RIGHT_CENTER: number;
      RIGHT_BOTTOM: number;
      BOTTOM_LEFT: number;
      BOTTOM_CENTER: number;
      BOTTOM_RIGHT: number;
    }

    interface Padding {
      top: number;
      bottom: number;
      left: number;
      right: number;
    }

    interface Control {}

    class NavigationControl {
      constructor(options?: { visualizePitch: boolean });
    }

    class DirectionsRenderer {
      constructor(options?: DirectionsRendererOptions);
      setMap(map: Map | null): void;
      setDirections(directions: DirectionsResult): void;
    }

    interface DirectionsRendererOptions {
      map?: Map;
      directions?: DirectionsResult;
      panel?: Element;
      suppressMarkers?: boolean;
      polylineOptions?: PolylineOptions;
    }

    interface PolylineOptions {
      strokeColor?: string;
      strokeWeight?: number;
      strokeOpacity?: number;
    }

    interface DirectionsResult {
      routes: DirectionsRoute[];
      request: any;
    }

    interface DirectionsRoute {
      bounds: LatLngBounds;
      legs: DirectionsLeg[];
      overview_path: LatLng[];
      overview_polyline: { points: string };
      warnings: string[];
      waypoint_order: number[];
    }

    interface DirectionsLeg {
      distance: Distance;
      duration: Duration;
      end_address: string;
      end_location: LatLng;
      start_address: string;
      start_location: LatLng;
      steps: DirectionsStep[];
    }

    interface DirectionsStep {
      distance: Distance;
      duration: Duration;
      end_location: LatLng;
      instructions: string;
      path: LatLng[];
      start_location: LatLng;
      travel_mode: TravelMode;
      transit?: TransitDetails;
    }

    interface Distance {
      text: string;
      value: number;
    }

    interface Duration {
      text: string;
      value: number;
    }

    type TravelMode = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

    interface TransitDetails {
      arrival_stop: TransitStop;
      arrival_time: Time;
      departure_stop: TransitStop;
      departure_time: Time;
      headsign: string;
      headway: number;
      line: TransitLine;
      num_stops: number;
    }

    interface TransitStop {
      location: LatLng;
      name: string;
    }

    interface Time {
      text: string;
      time_zone: string;
      value: Date;
    }

    interface TransitLine {
      agencies: TransitAgency[];
      color: string;
      icon: string;
      name: string;
      short_name: string;
      text_color: string;
      vehicle: TransitVehicle;
    }

    interface TransitAgency {
      name: string;
      phone: string;
      url: string;
    }

    interface TransitVehicle {
      icon: string;
      local_icon: string;
      name: string;
      type: string;
    }

    const MapTypeId: {
      ROADMAP: string;
      SATELLITE: string;
      HYBRID: string;
      TERRAIN: string;
    };
  }
}
