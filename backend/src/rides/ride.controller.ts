import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  ConfirmRideReqDto,
  EstimateRideDto,
  EstimateRideReqDto,
  RideByCustomerDto,
} from 'src/rides/dtos';
import { RideService } from 'src/rides/ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  @HttpCode(200)
  async estimate(
    @Body() request: EstimateRideReqDto,
  ): Promise<EstimateRideDto> {
    return this.rideService.estimate(
      request.origin,
      request.destination,
      request.customer_id,
    );
  }

  @Patch('confirm')
  @HttpCode(200)
  async confirm(@Body() request: ConfirmRideReqDto): Promise<void> {
    return this.rideService.confirm(request);
  }

  @Get(':customer_id')
  @HttpCode(200)
  @ApiQuery({ name: 'driver_id', required: false })
  async findByCustomer(
    @Param('customer_id') customer_id: string,
    @Query('driver_id') driver_id?: string,
  ): Promise<RideByCustomerDto> {
    return this.rideService.findByCustomer(customer_id, driver_id);
  }
}
