import { ComputeRoutesGoogleMaps, LatLng } from "./compute-routes-google-maps.type";
import { Ride } from "./ride.type";

export type RideEstimate = {
  customer_id: string;
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  options: Ride[];
  routeResponse: ComputeRoutesGoogleMaps;
};
