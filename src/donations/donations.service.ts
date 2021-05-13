/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donations } from './donations.entity';
import { DonationsDto } from './donationsDto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donations)
    private readonly donationsRepository: Repository<Donations>,
  ) {}

  async findAll() {
    const donations = await this.donationsRepository
      .createQueryBuilder('Donations')
      .leftJoinAndSelect('Donations.user', 'user');

      return donations.getMany();
  }

  async create(data: DonationsDto, user_id){
    const donations = new Donations()
    donations.text = data.text;
    donations.nominal = data.nominal
    donations.user = user_id

    return await this.donationsRepository.save(donations);
  }
}
