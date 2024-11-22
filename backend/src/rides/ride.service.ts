import { BadRequestException, Injectable } from '@nestjs/common';
import { EstimateRideDto } from 'src/rides/dtos/estimate-ride.dto';
import { GoogleMapsService } from 'src/shared/services/google-maps.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RideService {
  constructor(
    private googleMapsService: GoogleMapsService,
    private prismaService: PrismaService,
  ) {}

  async estimateRide(
    origin: string,
    destination: string,
    customer_id: string,
  ): Promise<EstimateRideDto> {
    // TODO - procurar lib para validações de dados
    if (
      origin == null ||
      destination == null ||
      customer_id == null ||
      origin === '' ||
      destination === '' ||
      customer_id === '' ||
      origin === destination
    ) {
      throw new BadRequestException(
        'Os dados fornecidos no corpo da requisição são inválidos',
      );
    }

    let estimateRideDto = new EstimateRideDto();
    estimateRideDto.routeResponse = await this.googleMapsService.getDistance(
      origin,
      destination,
    );

    const route = estimateRideDto.routeResponse.routes[0];

    estimateRideDto.duration = parseFloat(route.duration);

    estimateRideDto.distance = route.distanceMeters / 1000;

    const driversOptions = await this.prismaService.driver.findMany({
      where: {
        minimumKm: {
          lte: estimateRideDto.distance,
        },
      },
    });

    estimateRideDto.options = driversOptions.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: driver.rating,
          comment: driver.ratingText,
        },
        value: driver.pricePerKm * estimateRideDto.distance,
      };
    });

    estimateRideDto.origin =
      estimateRideDto.routeResponse.routes[0].legs[0].startLocation.latLng;
    estimateRideDto.destination =
      estimateRideDto.routeResponse.routes[0].legs[0].endLocation.latLng;

    return estimateRideDto;
  }
}
