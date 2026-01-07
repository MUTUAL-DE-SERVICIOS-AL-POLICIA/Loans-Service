import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    LoansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
