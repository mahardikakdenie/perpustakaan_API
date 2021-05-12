/* eslint-disable prettier/prettier */
import { Book } from 'src/books/books.entity';
import { Pinalty } from 'src/pinalty/pinalty.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Date_loan: Date;

  @Column()
  Date_return: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.loan)
  user: number;

  @ManyToOne(() => Book, (book) => book.loan)
  books: number;

  @ManyToOne(() => Pinalty, (pinalty) => pinalty.loan)
  pinalty: number
}
