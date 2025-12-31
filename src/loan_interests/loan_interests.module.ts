import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanInterestsService } from './loan_interests.service';
import { LoanInterestsController } from './loan_interests.controller';
import { LoanInterest } from './entities/loan_interests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanInterest])],
  controllers: [LoanInterestsController],
  providers: [LoanInterestsService],
  exports: [LoanInterestsService],
})
export class LoanInterestsModule {}