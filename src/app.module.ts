import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { LoanProceduresModule } from './loan_procedures/loan_procedures.module';
import { LoanModalityParametersModule } from './loan_modality_parameters/loan_modality_parameters.module';
import { LoanInterestsModule } from './loan_interests/loan_interests.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    LoanProceduresModule,
    LoanModalityParametersModule,
    LoanInterestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
