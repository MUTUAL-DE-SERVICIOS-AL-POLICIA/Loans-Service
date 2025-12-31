import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoanInterestsService } from './loan_interests.service';
import { LoanInterest } from './entities/loan_interests.entity';

@Controller()
export class LoanInterestsController {
  constructor(private readonly loanInterestsService: LoanInterestsService) {}

  /**
   * **Maneja el patrón de mensaje NATS 'loanInterests.findAll'.**
   * Delega la búsqueda de todos los Intereses de Préstamo que cumplen los criterios de filtro al LoanInterestsService.
   * @returns Una promesa que resuelve con un array de objetos LoanInterest.
   */
  @MessagePattern('loanInterests.findAll')
  findAll(@Payload() columns?: string[]): Promise<LoanInterest[]> {
    return this.loanInterestsService.findAll(columns);
  }

  /**
   * **Maneja el patrón de mensaje NATS 'loanInterests.findOne'.**
   * Busca un Interés de Préstamo específico por su ID, utilizando el LoanInterestsService.
   * Aplica un pipe para asegurar que el payload 'id' sea un número entero.
   * @param id El ID numérico del Interés de Préstamo extraído del payload del mensaje.
   * @returns Una promesa que resuelve con el objeto LoanInterest completo si es encontrado,
   * @throws NotFoundException si el registro no existe
   */
  @MessagePattern('loanInterests.findOne')
  findOne(@Payload('id', ParseIntPipe) id: number): Promise<LoanInterest> {
    return this.loanInterestsService.findOne(id);
  }

  /**
   * **Maneja el patrón de mensaje NATS 'loanInterests.findByProcedureModality'.**
   * Busca todos los Intereses de Préstamo asociados a una modalidad de trámite específica.
   * Aplica un pipe para asegurar que el payload 'procedureModalityId' sea un número entero.
   * @param procedureModalityId El ID de la modalidad de trámite extraído del payload del mensaje.
   * @returns Una promesa que resuelve con un array de objetos LoanInterest.
   */
  @MessagePattern('loanInterests.findByProcedureModality')
  findByProcedureModality(
    @Payload('procedureModalityId', ParseIntPipe) procedureModalityId: number,
  ): Promise<LoanInterest[]> {
    return this.loanInterestsService.findByProcedureModality(procedureModalityId);
  }
}