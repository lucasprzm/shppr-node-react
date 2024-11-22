import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EstimateRideReqDto } from 'src/rides/dtos/estimate-ride-req.dto';
import { EstimateRideDto } from 'src/rides/dtos/estimate-ride.dto';
import { RideService } from 'src/rides/ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  @HttpCode(200)
  async estimate(
    @Body() request: EstimateRideReqDto,
  ): Promise<EstimateRideDto> {
    return this.rideService.estimateRide(
      request.origin,
      request.destination,
      request.customer_id,
    );
  }
}
