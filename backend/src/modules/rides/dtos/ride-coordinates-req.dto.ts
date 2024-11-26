import { LatLng } from 'src/modules/shared/dtos';

export class RideCoordinatesReqDto {
  origin: LatLng;
  destination: LatLng;
}
