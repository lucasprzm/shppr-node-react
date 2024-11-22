import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleMapsService } from './services/google-maps.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PrismaService, GoogleMapsService],
  exports: [PrismaService, GoogleMapsService],
})
export class SharedModule {}
