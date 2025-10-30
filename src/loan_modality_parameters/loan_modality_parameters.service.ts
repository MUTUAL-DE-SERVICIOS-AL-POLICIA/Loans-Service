import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { LoanModalityParameter } from './entities/loan_modality_parameters.entity';
import { LoanProceduresService } from '../loan_procedures/loan_procedures.service';

@Injectable()
export class LoanModalityParametersService {
  constructor(
    @InjectRepository(LoanModalityParameter)
    private readonly loanModalityParametersRepository: Repository<LoanModalityParameter>,
    private readonly loanProceduresService: LoanProceduresService,
  ) { }

  /**
   * Obtiene todos los registros de parámetros de modalidad de préstamo
   * @returns Lista completa de LoanModalityParameter
   */
  async findAll(): Promise<LoanModalityParameter[]> {
    return this.loanModalityParametersRepository.find();
  }

  /**
   * Busca un registro por ID de modalidad de procedimiento
   * @param procedureModalityId Identificador de modalidad de procedimiento
   * @returns LoanModalityParameter o null si no se encuentra
   */
  async findOne(procedureModalityId: number): Promise<LoanModalityParameter | null> {
    return this.loanModalityParametersRepository.findOne({
      where: { procedureModalityId },
    });
  }

  /**
   * Busca registros por ID del procedimiento de préstamo
   * @param loanProcedureId Identificador del procedimiento de préstamo
   * @returns Lista de LoanModalityParameter asociados
   */
  async findByLoanProcedureId(loanProcedureId: number): Promise<LoanModalityParameter[]> {
    return this.loanModalityParametersRepository.find({
      where: { loanProcedureId },
    });
  }

  /**
   * Busca registros por una lista de IDs de modalidad de procedimiento
   * @param procedureModalityIds Lista de IDs de modalidad
   * @returns Lista de LoanModalityParameter que coinciden
   */
  async findByProcedureModalityIds(procedureModalityIds: number[]): Promise<LoanModalityParameter[]> {
    return this.loanModalityParametersRepository.find({
      where: { procedureModalityId: In(procedureModalityIds) },
    });
  }

  /**
   * Busca registros por una lista de IDs de modalidad de procedimiento
   * pero solo aquellos que tienen el loan_procedure habilitado
   * @param procedureModalityIds Lista de IDs de modalidad
   * @returns Lista de LoanModalityParameter que coinciden y tienen loan_procedure habilitado
   */
  async findByProcedureModalityIdsWithEnabledLoanProcedure(procedureModalityIds: number[]): Promise<LoanModalityParameter[]> {
    // Obtener los loan procedures habilitados usando el servicio directamente
    const enabledLoanProcedures = await this.loanProceduresService.findAllEnabled();

    // Extraer los IDs de los loan procedures habilitados
    const enabledLoanProcedureIds = enabledLoanProcedures.map(procedure => procedure.id);

    // Buscar los loan modality parameters que coincidan con los criterios
    return this.loanModalityParametersRepository.find({
      where: {
        procedureModalityId: In(procedureModalityIds),
        loanProcedureId: In(enabledLoanProcedureIds),
      },
    });
  }
}
