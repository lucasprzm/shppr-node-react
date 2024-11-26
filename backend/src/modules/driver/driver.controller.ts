import { Controller, Get } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { DriverDto } from './dto/driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driversService: DriverService) {}

  @Get()
  async getDrivers(): Promise<DriverDto[]> {
    return this.driversService.getDrivers();
  }
}
