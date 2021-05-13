/* eslint-disable prettier/prettier */
import { Body, Controller, Get, UseGuards, Post } from '@nestjs/common';
import { UserDecorator } from 'src/users/user.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { DonationsService } from './donations.service';
import { DonationsDto } from './donationsDto';

@Controller('api/donations')
@UseGuards(new AuthGuard())
export class DonationsController {
  constructor(private readonly donationService: DonationsService) {}

  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.donationService.findAll(),
    };
  }

  @Post('create')
  async create(@Body() data: DonationsDto, @UserDecorator() user) {
      return {
        meta: {
            status: true,
            message: 'Success'
        },
        data: await this.donationService.create(data, user)
      }
  }
}
