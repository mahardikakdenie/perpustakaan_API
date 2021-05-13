/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { LoansModule } from './loans/loans.module';
import { BooksModule } from './books/books.module';
import { PinaltyModule } from './pinalty/pinalty.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    UsersModule,
    RolesModule,
    LoansModule,
    BooksModule,
    PinaltyModule,
    DonationsModule,
  ],
  controllers: [],
})
export class AppModule {}
