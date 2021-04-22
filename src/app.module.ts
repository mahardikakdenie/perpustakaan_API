import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { LoansModule } from './loans/loans.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    UsersModule,
    RolesModule,
    LoansModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
