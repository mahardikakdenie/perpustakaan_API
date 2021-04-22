import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './books.dto';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  findAll() {
    const books = this.bookRepository.createQueryBuilder('Book');

    return books.getMany();
  }

  create(data: BookDTO) {
    const books = new Book();
    books.title = data.title;
    books.publisher = data.publisher;
    books.genre = data.genre;
    books.thumbnail_link = data.thumbnail_link;

    return this.bookRepository.save(books);
  }
}
