import { IsNotEmpty } from 'class-validator';
import { LatLng } from 'src/shared/dto';

export class RideCoordinatesReqDto {
  @IsNotEmpty()
  origin: LatLng;

  @IsNotEmpty()
  destination: LatLng;
}
