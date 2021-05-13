/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
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

  @Get(':id')
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.bookService.findById(id),
    };
  }

  @Patch(':id/edit')
  async edit(@Body() data: BookDTO, @Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.bookService.edit(data, id),
    };
  }

  @Delete(':id/delete')
  async deleteId(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success'
      },
      data: await this.bookService.deletebySoftDelete(id)
    }
  }
}
