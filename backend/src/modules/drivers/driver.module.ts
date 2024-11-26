import { Module } from '@nestjs/common';
import { SharedModule } from 'src/modules/shared/shared.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  imports: [SharedModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
