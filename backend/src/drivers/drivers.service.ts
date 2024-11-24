import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}

  async getDrivers(): Promise<DriverDto[]> {
    const drivers = await this.prismaService.driver.findMany();
    console.log(drivers);
    return drivers.map(
      (driver) =>
        ({
          ...driver,
        }) as DriverDto,
    );
  }
}
