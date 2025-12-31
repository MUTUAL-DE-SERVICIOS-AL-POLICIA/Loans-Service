import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanModalityParametersService } from './loan_modality_parameters.service';
import { LoanModalityParametersController } from './loan_modality_parameters.controller';
import { LoanModalityParameter } from './entities/loan_modality_parameters.entity';
import { LoanProceduresModule } from '../loan_procedures/loan_procedures.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanModalityParameter]),
    LoanProceduresModule,
  ],
  providers: [LoanModalityParametersService],
  controllers: [LoanModalityParametersController],
  exports: [LoanModalityParametersService],
})
export class LoanModalityParametersModule {}