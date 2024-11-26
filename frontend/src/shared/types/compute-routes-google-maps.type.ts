export type ComputeRoutesGoogleMaps = {
  routes: Route[];
};

type Route = {
  duration: string;
  distanceMeters: number;
  legs: RouteLeg[];
};

type RouteLeg = {
  startLocation: LocationMaps;
  endLocation: LocationMaps;
};

type LocationMaps = {
  latLng: LatLng;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};
