import {
  ComputeRoutesGoogleMapsDto,
  LatLng,
} from 'src/shared/dtos/compute-routes.google-maps.dto';
import { RideDto } from './ride.dto';

export class EstimateRideDto {
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  options: RideDto[];
  routeResponse: ComputeRoutesGoogleMapsDto;
}
