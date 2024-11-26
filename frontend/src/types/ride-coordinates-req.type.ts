import { LatLng } from "./compute-routes-google-maps.type";

export type RideCoordinatesReq = {
  origin: LatLng;
  destination: LatLng;
};
