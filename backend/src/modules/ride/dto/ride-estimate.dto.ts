import { ComputeRoutesGoogleMapsDto, LatLng } from 'src/shared/dto';
import { RideDto } from './ride.dto';

export class RideEstimateDto {
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  options: RideDto[];
  routeResponse: ComputeRoutesGoogleMapsDto;
}
