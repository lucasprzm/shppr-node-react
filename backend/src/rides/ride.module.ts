import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';

@Module({
  imports: [SharedModule],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
