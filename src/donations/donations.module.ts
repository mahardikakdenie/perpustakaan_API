/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donations } from './donations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Donations])],
  providers: [DonationsService],
  controllers: [DonationsController]
})
export class DonationsModule {}
