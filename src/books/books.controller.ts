/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/users.guard';
import { BookDTO } from './books.dto';
import { BooksService } from './books.service';

@Controller('api/books')
@UseGuards(new AuthGuard())
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.bookService.findAll(),
    };
  }

  @Post('create')
  async create(@Body() data: BookDTO) {
    return {
      meta: {
        status: true,
        message: 'Message',
      },
      data: await this.bookService.create(data),
    };
  }
}
