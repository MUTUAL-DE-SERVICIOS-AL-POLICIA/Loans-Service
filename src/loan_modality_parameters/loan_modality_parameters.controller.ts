import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoanModalityParametersService } from './loan_modality_parameters.service';

@Controller()
export class LoanModalityParametersController {
  constructor(
    private readonly loanModalityParametersService: LoanModalityParametersService,
  ) { }

  @MessagePattern('loanModalityParameters.findAll')
  findAll() {
    return this.loanModalityParametersService.findAll();
  }

  @MessagePattern('loanModalityParameters.findOne')
  findOne(data: { procedureModalityId: number }) {
    return this.loanModalityParametersService.findOne(data.procedureModalityId);
  }

  @MessagePattern('loanModalityParameters.findByLoanProcedureId')
  findByLoanProcedureId(data: { loanProcedureId: number }) {
    return this.loanModalityParametersService.findByLoanProcedureId(data.loanProcedureId);
  }

  @MessagePattern('loanModalityParameters.findByProcedureModalityIds')
  findByProcedureModalityIds(data: { procedureModalityIds: number[] }) {
    return this.loanModalityParametersService.findByProcedureModalityIds(data.procedureModalityIds);
  }

  @MessagePattern('loanModalityParameters.findByProcedureModalityIdsWithEnabledLoanProcedure')
  findByProcedureModalityIdsWithEnabledLoanProcedure(data: { procedureModalityIds: number[] }) {
    return this.loanModalityParametersService.findByProcedureModalityIdsWithEnabledLoanProcedure(data.procedureModalityIds);
  }
}