/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async registrasi(data: UserDTO) {
    const { username } = data;
    let users = await this.userRepository.findOne({ where: { username } });

    if (users) {
      throw new HttpException('user Already Exist ', HttpStatus.BAD_REQUEST);
    }
    users = await this.userRepository.create(data);
    await this.userRepository.save(users);
    return users.toResponseObject(false);
  }

  async registrasiAsAdmin(data: UserDTO) {
    const { username } = data;
    let users = await this.userRepository.findOne({ where: { username } });

    if (users) {
      throw new HttpException('user Already Exist ', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.address = data.address;
    user.roles = 2;

    users = await this.userRepository.create(user);
    await this.userRepository.save(users);

    return users.toResponseObject(false);
  }

  async login(data: UserDTO) {
    const { username, password } = data;
    const users = await this.userRepository.findOne({ where: { username } });
    if (!users || !(await users.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return users.toResponseObject(false);
  }

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.roles', 'roles')
      .leftJoinAndSelect('User.loan', 'loan');
    return users.getMany();
  }
}
