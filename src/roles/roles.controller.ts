import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/users.guard';
import { RolesDto } from './roles.dto';
import { RolesService } from './roles.service';

@Controller('api/roles')
@UseGuards(new AuthGuard())
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.roleService.findAll(),
    };
  }

  @Get(':id')
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.roleService.findById(id),
    };
  }

  @Post('create')
  async create(@Body() data: RolesDto) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.roleService.create(data),
    };
  }
}
