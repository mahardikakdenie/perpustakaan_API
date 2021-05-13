/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
=======
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
>>>>>>> aacfaf3acfe67925457dde624b9a136a2f3e1ad2
import { UserDecorator } from 'src/users/user.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { PinaltyService } from './pinalty.service';
import { PinaltyDTO } from './pinaltyDTO';

@Controller('api/pinalty')
@UseGuards(new AuthGuard())
export class PinaltyController {
<<<<<<< HEAD
  constructor(private readonly pinaltyService: PinaltyService) {}

  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.pinaltyService.findAll(),
    };
  }

  @Get(':id')
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.pinaltyService.findById(id),
    };
  }

  @Post('create')
  async create(@Body() data: PinaltyDTO, @UserDecorator() user) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.pinaltyService.create(data, user),
    };
  }

  @Patch(':id/edit')
  async edit(@Body() data: PinaltyDTO, id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.pinaltyService.edit(data, id),
    };
  }
=======
    constructor(private readonly pinaltyService: PinaltyService) {}

    @Get()
    async findAll () {
        return {
            meta: {
                status: true,
                message: 'Success'
            }, 
            data: await this.pinaltyService.findAll()
        }
    }

    @Post('create')
    async create(@Body() data: PinaltyDTO, @UserDecorator() user) {
        return {
            meta: {
                status: true,
                message: 'Success'
            },
            data: await this.pinaltyService.create(data, user)
        }
    }
>>>>>>> aacfaf3acfe67925457dde624b9a136a2f3e1ad2
}
