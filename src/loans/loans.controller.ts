/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDecorator } from 'src/users/user.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { LoanDTO } from './loans.dto';
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

  @Post('create')
  async create(@Body() data: LoanDTO, @UserDecorator() user) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.loanService.create(data, user)
    };
  }
}
