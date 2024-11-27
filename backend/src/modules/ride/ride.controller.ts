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
  RideByCustomerDto,
  RideConfirmReqDto,
  RideCoordinatesReqDto,
  RideEstimateDto,
  RideEstimateReqDto,
} from 'src/modules/ride/dto';
import { RideService } from 'src/modules/ride/ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  @HttpCode(200)
  async estimate(
    @Body() request: RideEstimateReqDto,
  ): Promise<RideEstimateDto> {
    return this.rideService.estimate(request.origin, request.destination);
  }

  @Patch('confirm')
  @HttpCode(200)
  async confirm(@Body() request: RideConfirmReqDto): Promise<void> {
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

  @Post('estimate/map')
  @HttpCode(200)
  async getStaticMap(@Body() request: RideCoordinatesReqDto): Promise<string> {
    return this.rideService.getStaticMap(request.origin, request.destination);
  }
}
