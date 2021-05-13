/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pinalty } from './pinalty.entity';
import { PinaltyDTO } from './pinaltyDTO';

@Injectable()
export class PinaltyService {
  constructor(
    @InjectRepository(Pinalty)
    private readonly pinaltyRepository: Repository<Pinalty>,
  ) {}

  async findAll() {
    const pinalty = await this.pinaltyRepository
      .createQueryBuilder('Pinalty')
      .leftJoinAndSelect('Pinalty.loan', 'loan')
      .leftJoinAndSelect('Pinalty.user', 'user');

    return pinalty.getMany();
  }

  async findById(id: any) {
    console.log(id.id);

    const pinalty = await this.pinaltyRepository
      .createQueryBuilder('Pinalty')
      .leftJoinAndSelect('Pinalty.loan', 'loan')
      .leftJoinAndSelect('Pinalty.user', 'user')
      .where('Pinalty.id = :id', { id: id.id });

    if (!pinalty) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return pinalty.getOne();
  }
  async create(data: PinaltyDTO, user_id) {
    const pinalty = new Pinalty();
    pinalty.name = data.name;
    pinalty.display_name = data.display_name;
    pinalty.nominal = data.nominal;
    pinalty.isVerified = false;
    pinalty.status = data.status;
    pinalty.user = user_id;

    return await this.pinaltyRepository.save(pinalty);
  }

  async edit(data: PinaltyDTO, id: any) {
    const pinalty = await this.pinaltyRepository
      .createQueryBuilder('Pinalty')
      .update()
      .set(data)
      .where('Pinalty.id = :id', { id: { id } });

    return pinalty.execute();
  }
}
