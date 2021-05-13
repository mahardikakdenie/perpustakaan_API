/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  // ViewColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Roles } from 'src/roles/roles.entity';
import { Loan } from 'src/loans/loans.entity';
import { Pinalty } from 'src/pinalty/pinalty.entity';
import { Donations } from 'src/donations/donations.entity';

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

  // @ViewColumn()
  // role_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Roles, (roles) => roles.user)
  roles: number;

  @OneToMany(() => Loan, (loan) => loan.user)
  loan: Loan[];

  @OneToMany(() => Pinalty, (pinalty) => pinalty.user)
  pinalty: Pinalty[];

  @OneToMany(() => Donations, (donations) => donations.user)
  donations: Donations[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  toResponseObject() {
    const { id, created_at, username, roles, loan } = this;
    const users: any = {
      id,
      created_at,
      username,
      roles,
      loan,
    };
    const anyResponse: any = {
      users,
    };
    return anyResponse;
  }
  toResponseObjecGetToken(showToken: boolean) {
    const { id, created_at, username, token, roles } = this;
    const responseObject: any = {
      id,
      created_at,
      username,
      token,
      roles,
    };
    if (showToken) {
      responseObject.token = token;
    }
    const anyResponse: any = {
      meta: {
        status: true,
        message: 'Success',
      },
      data: responseObject,
    };
    return anyResponse;
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
