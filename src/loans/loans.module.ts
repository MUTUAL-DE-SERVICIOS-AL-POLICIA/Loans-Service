import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoanInterest } from './entities/loan-interest.entity';
import { LoanModalityParameter } from './entities/loan-modality-parameter.entity';
import { LoanProcedure } from './entities/loan-procedure.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoanInterest,
      LoanModalityParameter,
      LoanProcedure,
    ]),
  ],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService],
})
export class LoansModule {}