/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserDecorator } from 'src/users/user.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { LoanDTO } from './loans.dto';
import { LoansService } from './loans.service';

@Controller('api/loans')
@UseGuards(new AuthGuard())
export class LoansController {
  constructor(private readonly loanService: LoansService) {}
  @Get()
  async findAll(@Query() q: string) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.loanService.findAll(q),
    };
  }

  @Get(':id')
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.loanService.findById(id),
    };
  }

  @Patch(':id/edit')
  async edit(@Body() data: LoanDTO, @Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.loanService.edit(data, id),
    };
  }

  @Post('create')
  async create(@Body() data: LoanDTO, @UserDecorator() user) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.loanService.create(data, user),
    };
  }

  @Delete(':id/delete')
  async softDelete(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success'
      },
      data: await this.loanService.deleteBySoft(id)
    }
  }
}
