import { Module } from '@nestjs/common';
import { RideModule } from './rides/ride.module';

@Module({
  imports: [RideModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
