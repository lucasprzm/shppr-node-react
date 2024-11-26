import { LatLng } from 'src/shared/dto';

export class RideCoordinatesReqDto {
  origin: LatLng;
  destination: LatLng;
}
