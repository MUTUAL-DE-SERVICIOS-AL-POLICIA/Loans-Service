import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoanProceduresService } from './loan_procedures.service';

@Controller()
export class LoanProceduresController {
  constructor(private readonly loanProceduresService: LoanProceduresService) { }

  @MessagePattern('loanProcedures.findAllEnabled')
  findAllEnabled() {
    return this.loanProceduresService.findAllEnabled();
  }

}