import { Controller, Get } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverDto } from './dtos/driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driversService: DriverService) {}

  @Get()
  async getDrivers(): Promise<DriverDto[]> {
    return this.driversService.getDrivers();
  }
}
