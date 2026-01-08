import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoansService } from './loans.service';
import { LoanInterest } from './entities/loan-interest.entity';
import { LoanModalityParameter } from './entities/loan-modality-parameter.entity';
import { LoanProcedure } from './entities/loan-procedure.entity';

@Controller()
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // ==================== LOAN INTERESTS ENDPOINTS ====================

  /**
   * **Maneja el patrón de mensaje NATS 'loanInterests.findAll'.**
   * Delega la búsqueda de todos los Intereses de Préstamo que cumplen los criterios de filtro al LoansService.
   * @returns Una promesa que resuelve con un array de objetos LoanInterest.
   */
  @MessagePattern('loanInterests.findAll')
  findAllInterests(@Payload() columns?: string[]): Promise<LoanInterest[]> {
    return this.loansService.findAllInterests(columns);
  }

  /**
   * **Maneja el patrón de mensaje NATS 'loanInterests.findOne'.**
   * Busca un Interés de Préstamo específico por su ID, utilizando el LoansService.
   * Aplica un pipe para asegurar que el payload 'id' sea un número entero.
   * @param id El ID numérico del Interés de Préstamo extraído del payload del mensaje.
   * @returns Una promesa que resuelve con el objeto LoanInterest completo si es encontrado,
   * @throws NotFoundException si el registro no existe
   */
  @MessagePattern('loanInterests.findOne')
  findOneInterest(@Payload('id', ParseIntPipe) id: number): Promise<LoanInterest> {
    return this.loansService.findOneInterest(id);
  }

  /**
   * **Maneja el patrón de mensaje NATS 'loanInterests.findByProcedureModality'.**
   * Busca todos los Intereses de Préstamo asociados a una modalidad de trámite específica.
   * Aplica un pipe para asegurar que el payload 'procedureModalityId' sea un número entero.
   * @param procedureModalityId El ID de la modalidad de trámite extraído del payload del mensaje.
   * @returns Una promesa que resuelve con un array de objetos LoanInterest.
   */
  @MessagePattern('loanInterests.findByProcedureModality')
  findInterestsByProcedureModality(
    @Payload('procedureModalityId', ParseIntPipe) procedureModalityId: number,
  ): Promise<LoanInterest[]> {
    return this.loansService.findInterestsByProcedureModality(procedureModalityId);
  }

  // ==================== LOAN MODALITY PARAMETERS ENDPOINTS ====================

  @MessagePattern('loanModalityParameters.findAll')
  findAllModalityParameters(): Promise<LoanModalityParameter[]> {
    return this.loansService.findAllModalityParameters();
  }

  @MessagePattern('loanModalityParameters.findOne')
  findOneModalityParameter(@Payload() data: { procedureModalityId: number }): Promise<LoanModalityParameter | null> {
    return this.loansService.findOneModalityParameter(data.procedureModalityId);
  }

  @MessagePattern('loanModalityParameters.findByLoanProcedureId')
  findModalityParametersByLoanProcedureId(@Payload() data: { loanProcedureId: number }): Promise<LoanModalityParameter[]> {
    return this.loansService.findModalityParametersByLoanProcedureId(data.loanProcedureId);
  }

  @MessagePattern('loanModalityParameters.findByProcedureModalityIds')
  findModalityParametersByProcedureModalityIds(@Payload() data: { procedureModalityIds: number[] }): Promise<LoanModalityParameter[]> {
    return this.loansService.findModalityParametersByProcedureModalityIds(data.procedureModalityIds);
  }

  @MessagePattern('loanModalityParameters.findByProcedureModalityIdsWithEnabledLoanProcedure')
  findModalityParametersByProcedureModalityIdsWithEnabledLoanProcedure(@Payload() data: { procedureModalityIds: number[] }): Promise<LoanModalityParameter[]> {
    return this.loansService.findModalityParametersByProcedureModalityIdsWithEnabledLoanProcedure(data.procedureModalityIds);
  }

  // ==================== LOAN PROCEDURES ENDPOINTS ====================

  @MessagePattern('loanProcedures.findAllEnabled')
  findAllEnabledProcedures(): Promise<LoanProcedure[]> {
    return this.loansService.findAllEnabledProcedures();
  }
}