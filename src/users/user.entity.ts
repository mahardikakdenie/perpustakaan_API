/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Roles } from 'src/roles/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Roles, (roles) => roles.user)
  roles: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  toResponseObject(showToken: boolean) {
    const { id, created_at, username, token } = this;
    const responseObject: any = {
      id,
      created_at,
      username,
      token,
    };
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attemp: string) {
    return await bcrypt.compare(attemp, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
