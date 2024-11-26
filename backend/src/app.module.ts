import { Module } from '@nestjs/common';
import { DriverModule } from './modules/drivers/driver.module';
import { RideModule } from './modules/rides/ride.module';

@Module({
  imports: [RideModule, DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
