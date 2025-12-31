import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanProceduresService } from './loan_procedures.service';
import { LoanProceduresController } from './loan_procedures.controller';
import { LoanProcedure } from './entities/loan_procedures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanProcedure])],
  controllers: [LoanProceduresController],
  providers: [LoanProceduresService],
  exports: [LoanProceduresService],
})
export class LoanProceduresModule {}