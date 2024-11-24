import { Module } from '@nestjs/common';
import { RideModule } from './rides/ride.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [RideModule, DriversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
