import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { catchError, firstValueFrom } from 'rxjs';
import { ComputeRoutesGoogleMapsDto } from '../dtos/compute-routes.google-maps.dto';

@Injectable()
export class GoogleMapsService {
  constructor(private readonly httpService: HttpService) {}

  async getDistance(
    origin: string,
    destination: string,
  ): Promise<ComputeRoutesGoogleMapsDto> {
    console.log(env.GOOGLE_API_KEY);
    const req = {
      origin: {
        address: '1800 Amphitheatre Parkway, Mountain View, CA 94043',
      },
      destination: {
        address: 'Sloat Blvd &, Upper Great Hwy, San Francisco, CA 94132',
      },
      travelMode: 'DRIVE',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://routes.googleapis.com/directions/v2:computeRoutes',
          req,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': env.GOOGLE_API_KEY,
              'X-Goog-FieldMask':
                'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
            },
          },
        )
        .pipe(
          catchError((error) => {
            throw error;
          }),
        ),
    );
    return data;
  }
}