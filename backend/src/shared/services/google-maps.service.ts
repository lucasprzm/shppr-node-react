import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { catchError, firstValueFrom } from 'rxjs';
import { ComputeRoutesGoogleMapsDto, LatLng } from '../dto';

@Injectable()
export class GoogleMapsService {
  constructor(private readonly httpService: HttpService) {}

  async getDistance(
    origin: string,
    destination: string,
  ): Promise<ComputeRoutesGoogleMapsDto> {
    const req = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
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

  async getStaticMap(origin: LatLng, destination: LatLng): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/staticmap?size=600x300
      &markers=color:blue|label:A|${origin.latitude},${origin.longitude}
      &markers=color:blue|label:B|${destination.latitude},${destination.longitude}
      &key=${env.GOOGLE_API_KEY}`;

    return url;
  }
}
