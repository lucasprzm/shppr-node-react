import { ComputeRoutesGoogleMapsDto, LatLng } from 'src/shared/dtos';
import { RideDto } from './ride.dto';

export class EstimateRideDto {
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  options: RideDto[];
  routeResponse: ComputeRoutesGoogleMapsDto;
}