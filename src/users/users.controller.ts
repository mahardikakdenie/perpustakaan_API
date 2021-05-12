/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { UserDecorator } from './user.decorator';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { AuthGuard } from './users.guard';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async showAllUsers(@Query() q: string, @Query() sort: string) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.userService.findAll(q, sort),
    };
  }

  @Get('me1')
  @UseGuards(new AuthGuard())
  async findOne(@UserDecorator() user: User) {
    return {
      meta: {
        status: true,
        message: "success"
      }, 
      data: await user
    }
  }

  @Get('me')
  @UseGuards(new AuthGuard())
  async me(@UserDecorator() user: User) {
    return {
      meta: {
        status: true,
        message: "success"
      }, 
      data: await this.userService.me(user)
    }
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Message',
      },
      data: await this.userService.findById(id),
    };
  }

  @Post('/login')
  login(@Body() data: User) {
    return this.userService.login(data);
  }

  @Post('/register')
  register(@Body() data: UserDTO) {
    return this.userService.registrasi(data);
  }

  @Post('/register/admin')
  registerAsAdmin(@Body() data: UserDTO) {
    return this.userService.registrasiAsAdmin(data);
  }

  @Patch(':id/edit')
  async editById(@Body() data: UserDTO, @Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Succes',
      },
      data: await this.userService.editById(data, id),
    };
  }
}
