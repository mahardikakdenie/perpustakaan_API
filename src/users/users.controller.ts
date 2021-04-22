import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { AuthGuard } from './users.guard';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(new AuthGuard())
  showAllUsers() {
    return this.userService.findAll();
  }

  @Post('/login')
  login(@Body() data: UserDTO) {
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
}
