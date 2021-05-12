/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/users.guard';
import { LoansService } from './loans.service';

@Controller('api/loans')
@UseGuards(new AuthGuard())
export class LoansController {
  constructor(private readonly loanService: LoansService) {}
  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.loanService.findAll(),
    };
  }
}
