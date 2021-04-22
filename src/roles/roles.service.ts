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

  create(data: RolesDto) {
    const roles = new Roles();
    roles.name = data.name;
    roles.display_name = data.display_name;
    roles.status = false;

    return this.rolesRepository.save(roles);
  }
}
