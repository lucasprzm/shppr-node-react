import { Controller, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriverDto } from './dto/driver.dto';

@Controller('driver')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getDrivers(): Promise<DriverDto[]> {
    return this.driversService.getDrivers();
  }
}
