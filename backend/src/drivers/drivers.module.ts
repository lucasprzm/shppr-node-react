import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  imports: [SharedModule],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
