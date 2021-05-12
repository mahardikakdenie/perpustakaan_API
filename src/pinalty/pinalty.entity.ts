/* eslint-disable prettier/prettier */
import { Loan } from "src/loans/loans.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pinalty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column()
    display_name: string;

    @Column('varchar')
    nominal: string

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=>Loan , (loan) => loan.pinalty)
    loan: Loan[]

    @ManyToOne(() => User , (user) => user.pinalty)
    user: number;
}
