/* eslint-disable prettier/prettier */
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Donations {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text: string;

    @Column()
    nominal: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => User, (user) => user.donations)
    user: number;
}
