import { LatLng } from 'src/shared/dtos';

export class RideCoordinatesReqDto {
  origin: LatLng;
  destination: LatLng;
}
