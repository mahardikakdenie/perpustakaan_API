/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanDTO } from './loans.dto';
import { Loan } from './loans.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async findAll(q: any) {
    const loans = await this.loanRepository
      .createQueryBuilder('Loan')
      .leftJoinAndSelect('Loan.user', 'user')
      .leftJoinAndSelect('Loan.pinalty', 'pinalty')
      .leftJoinAndSelect('Loan.books', 'books');

    if (q.q) {
      loans.where('Loan.user.name = :user.name', { name: q.q });
    }
    return loans.getMany();
  }

  async findById(id: any) {
    const loans = await this.loanRepository
      .createQueryBuilder('Loan')
      .leftJoinAndSelect('Loan.user', 'user')
      .leftJoinAndSelect('Loan.pinalty', 'pinalty')
      .leftJoinAndSelect('Loan.books', 'books')
      .where('Loan.id = :id', { id: id.id });

    return loans.getOneOrFail();
  }

  create(data: LoanDTO, user_id: number) {
    const loans = new Loan();
    loans.Date_loan = data.date_loan;
    loans.Date_return = data.date_return;
    loans.user = user_id;
    loans.pinalty = data.pinaltyId;
    loans.books = data.bookId;

    return this.loanRepository.save(loans);
  }

  async edit(data: LoanDTO, id: any) {
    const loans = await this.loanRepository
      .createQueryBuilder('Loan')
      .update()
      .set(data)
      .where('Loan.id = :id', {id: id.id})

      return loans.execute()
  }

  async deleteBySoft(id: any) {
    const pinalty = await this.loanRepository
      .createQueryBuilder('Loan')
      .softDelete()
      .where('Loan.id = :id', { id: id.id });

    return pinalty.execute();
  }
}
