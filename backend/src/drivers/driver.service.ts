import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { DriverDto } from './dtos/driver.dto';

@Injectable()
export class DriverService {
  constructor(private prismaService: PrismaService) {}

  async getDrivers(): Promise<DriverDto[]> {
    const drivers = await this.prismaService.driver.findMany();
    return drivers.map(
      (driver) =>
        ({
          ...driver,
        }) as DriverDto,
    );
  }
}
