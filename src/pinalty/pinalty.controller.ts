/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDecorator } from 'src/users/user.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { PinaltyService } from './pinalty.service';
import { PinaltyDTO } from './pinaltyDTO';

@Controller('api/pinalty')
@UseGuards(new AuthGuard())
export class PinaltyController {
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
}
