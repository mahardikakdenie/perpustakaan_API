/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PinaltyService } from './pinalty.service';
import { PinaltyController } from './pinalty.controller';
import { Pinalty } from './pinalty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pinalty])],
  providers: [PinaltyService],
  controllers: [PinaltyController]
})
export class PinaltyModule {}
