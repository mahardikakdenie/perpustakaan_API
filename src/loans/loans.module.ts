import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';

@Module({
  providers: [LoansService],
  controllers: [LoansController],
})
export class LoansModule {}
