import { Module } from '@nestjs/common';
import { DriverModule } from './drivers/driver.module';
import { RideModule } from './rides/ride.module';

@Module({
  imports: [RideModule, DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
