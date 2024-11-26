import { Module } from '@nestjs/common';
import { DriverModule } from './modules/driver/driver.module';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [RideModule, DriverModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
