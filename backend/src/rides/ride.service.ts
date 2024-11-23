import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import {
  ConfirmRideReqDto,
  EstimateRideDto,
  RideByCustomerDto,
} from 'src/rides/dtos';
import { BadRequestException } from 'src/shared/exceptions/badrequest.exception';
import { GoogleMapsService } from 'src/shared/services/google-maps.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RideService {
  constructor(
    private googleMapsService: GoogleMapsService,
    private prismaService: PrismaService,
  ) {}

  async estimate(
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
        'INVALID_DATA',
        'Os dados fornecidos no corpo da requisição são inválidos',
      );
    }

    let estimateRideDto = new EstimateRideDto();
    estimateRideDto.routeResponse = await this.googleMapsService.getDistance(
      origin,
      destination,
    );

    const route = estimateRideDto.routeResponse.routes[0];

    estimateRideDto.duration = route.duration;

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

  async confirm(request: ConfirmRideReqDto): Promise<void> {
    if (
      request.origin == null ||
      request.destination == null ||
      request.origin == '' ||
      request.destination == '' ||
      request.customer_id == '' ||
      request.customer_id == null ||
      request.origin == request.destination
    ) {
      throw new BadRequestException(
        'INVALID_DATA',
        'Os dados fornecidos no corpo da requisição são inválidos',
      );
    }

    const driver = await this.prismaService.driver.findUnique({
      where: {
        id: request.driver.id,
      },
    });

    if (driver == null) {
      throw new NotFoundException('Motorista não encontrado');
    }

    if (driver.minimumKm > request.distance) {
      throw new NotAcceptableException(
        'Quilometragem inválida para o motorista',
      );
    }

    await this.prismaService.ride.create({
      data: {
        origin: request.origin,
        destination: request.destination,
        driver_id: driver.id,
        customer_id: request.customer_id,
        distance: request.distance,
        value: request.value,
        duration: request.duration,
      },
    });
  }

  async findByCustomer(
    customer_id: string,
    driver_id?: string,
  ): Promise<RideByCustomerDto> {
    if (customer_id == null || customer_id == '') {
      throw new BadRequestException(
        'INVALID_DATA',
        'Os dados fornecidos no corpo da requisição são inválidos',
      );
    }
    const driver_id_int = driver_id != null ? parseInt(driver_id) : null;

    if (driver_id_int != null && driver_id_int <= 0) {
      throw new BadRequestException('INVALID_DRIVER', 'Motorista inválido');
    }

    if (driver_id_int != null) {
      const driverExists = await this.prismaService.driver.findUnique({
        where: {
          id: driver_id_int,
        },
      });
      if (!driverExists) {
        throw new BadRequestException('INVALID_DRIVER', 'Motorista inválido');
      }
    }

    const rides = await this.prismaService.ride.findMany({
      where: {
        customer_id,
        driver_id: driver_id_int != null ? driver_id_int : undefined,
      },
      include: {
        driver: true,
      },
    });

    if (rides.length === 0) {
      throw new NotFoundException('Nenhum registro encontrado');
    }

    const rideByCustomerDto = new RideByCustomerDto();
    rideByCustomerDto.customer_id = customer_id;
    rideByCustomerDto.rides = rides.map((ride) => {
      return {
        ...ride,
        date: ride.createdAt,
      };
    });

    return rideByCustomerDto;
  }
}
