/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesDto } from './roles.dto';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  findAll() {
    const roles = this.rolesRepository
      .createQueryBuilder('Roles')
      .leftJoinAndSelect('Roles.user', 'user');
    return roles.getMany();
  }

  findById(id: any) {
    const roles = this.rolesRepository
      .createQueryBuilder('Roles')
      .where('Roles.id = :id', { id: id.id })
      .leftJoinAndSelect('Roles.user', 'user');

    return roles.getOne();
  }

  create(data: RolesDto) {
    const roles = new Roles();
    roles.name = data.name;
    roles.display_name = data.display_name;
    roles.status = false;

    return this.rolesRepository.save(roles);
  }
}
