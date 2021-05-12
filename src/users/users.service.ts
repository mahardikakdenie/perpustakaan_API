/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async registrasi(data: UserDTO) {
    const { username } = data;
    let users = await this.userRepository.findOne({ where: { username } });

    if (users) {
      throw new HttpException('user Already Exist ', HttpStatus.BAD_REQUEST);
    }
    users = await this.userRepository.create(data);
    await this.userRepository.save(users);
    return users.toResponseObjecGetToken(false);
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

    return users.toResponseObjecGetToken(false);
  }
  async me(id: any) {
    console.log(id);

    const user = await this.userRepository.createQueryBuilder('User').leftJoinAndSelect('User.roles', 'roles')
      .leftJoinAndSelect('User.loan', 'loan')
      .where('User.id = :id', { id: id });

    return user.getOne();
  }

  async login(data: UserDTO) {
    const { username, password, email } = data;
    const users = await this.userRepository
      .createQueryBuilder('User')
      .where('User.username = :username', { username: username })
      .orWhere('User.email = :email', { email: email })
      .getOne();
    if (!users || !(await users.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return users.toResponseObjecGetToken(false);
  }

  async findAll(q: any, sort: any) {
    const users = await this.userRepository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.roles', 'roles')
      .leftJoinAndSelect('User.loan', 'loan');

    if (q.q) {
      users.where('User.username = :username', { username: q.q });
    }

    if (sort.sort === '-id') {
      users.orderBy('User.id', 'DESC');
    }
    return (await users.getMany()).map((x) => x.toResponseObject());
  }

  async findById(id: any) {
    const users = await this.userRepository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.roles', 'roles')
      .leftJoinAndSelect('User.loan', 'loan')
      .where('User.id = :id', { id: id.id });

    return users.getOne();
  }

  async editById(data: UserDTO, id: any) {
    const users = await this.userRepository
      .createQueryBuilder('User')
      .update()
      .set(data)
      .where('User.id = :id', { id: id.id });

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return users.execute();
  }
}
