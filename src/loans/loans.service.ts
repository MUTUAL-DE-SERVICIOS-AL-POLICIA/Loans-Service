import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { LoanInterest } from './entities/loan-interest.entity';
import { LoanModalityParameter } from './entities/loan-modality-parameter.entity';
import { LoanProcedure } from './entities/loan-procedure.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(LoanInterest)
    private readonly loanInterestsRepository: Repository<LoanInterest>,
    @InjectRepository(LoanModalityParameter)
    private readonly loanModalityParametersRepository: Repository<LoanModalityParameter>,
    @InjectRepository(LoanProcedure)
    private readonly loanProceduresRepository: Repository<LoanProcedure>,
  ) {}

  // ==================== LOAN INTERESTS METHODS ====================

  /**
   * **Encuentra todos los registros de intereses de préstamos.**
   * @param columns - Array opcional de columnas a seleccionar
   * @returns Una promesa que resuelve con un array de objetos LoanInterest
   */
  async findAllInterests(columns?: string[]): Promise<LoanInterest[]> {
    if (columns && columns.length > 0) {
      return this.loanInterestsRepository.find({
        select: columns as (keyof LoanInterest)[],
      });
    }
    return this.loanInterestsRepository.find();
  }

  /**
   * **Encuentra un registro de interés de préstamo por su ID.**
   * @param id - El ID numérico del registro
   * @returns Una promesa que resuelve con el objeto LoanInterest si es encontrado
   * @throws NotFoundException si el registro no existe
   */
  async findOneInterest(id: number): Promise<LoanInterest> {
    const loanInterest = await this.loanInterestsRepository.findOne({
      where: { id },
    });

    if (!loanInterest) {
      throw new NotFoundException(`Loan interest with ID ${id} not found`);
    }

    return loanInterest;
  }

  /**
   * **Encuentra registros de intereses por ID de modalidad de trámite.**
   * @param procedureModalityId - El ID de la modalidad de trámite
   * @returns Una promesa que resuelve con un array de objetos LoanInterest
   */
  async findInterestsByProcedureModality(procedureModalityId: number): Promise<LoanInterest[]> {
    return this.loanInterestsRepository.find({
      where: { procedureModalityId },
    });
  }

  // ==================== LOAN MODALITY PARAMETERS METHODS ====================

  /**
   * Obtiene todos los registros de parámetros de modalidad de préstamo
   * @returns Lista completa de LoanModalityParameter
   */
  async findAllModalityParameters(): Promise<LoanModalityParameter[]> {
    return this.loanModalityParametersRepository.find();
  }

  /**
   * Busca un registro por ID de modalidad de procedimiento
   * @param procedureModalityId Identificador de modalidad de procedimiento
   * @returns LoanModalityParameter o null si no se encuentra
   */
  async findOneModalityParameter(procedureModalityId: number): Promise<LoanModalityParameter | null> {
    return this.loanModalityParametersRepository.findOne({
      where: { procedureModalityId },
    });
  }

  /**
   * Busca registros por ID del procedimiento de préstamo
   * @param loanProcedureId Identificador del procedimiento de préstamo
   * @returns Lista de LoanModalityParameter asociados
   */
  async findModalityParametersByLoanProcedureId(loanProcedureId: number): Promise<LoanModalityParameter[]> {
    return this.loanModalityParametersRepository.find({
      where: { loanProcedureId },
    });
  }

  /**
   * Busca registros por una lista de IDs de modalidad de procedimiento
   * @param procedureModalityIds Lista de IDs de modalidad
   * @returns Lista de LoanModalityParameter que coinciden
   */
  async findModalityParametersByProcedureModalityIds(procedureModalityIds: number[]): Promise<LoanModalityParameter[]> {
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
  async findModalityParametersByProcedureModalityIdsWithEnabledLoanProcedure(procedureModalityIds: number[]): Promise<LoanModalityParameter[]> {
    // Obtener los loan procedures habilitados
    const enabledLoanProcedures = await this.findAllEnabledProcedures();

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

  // ==================== LOAN PROCEDURES METHODS ====================

  async findAllEnabledProcedures(): Promise<LoanProcedure[]> {
    const procedures = await this.loanProceduresRepository.find({
      where: {
        isEnable: true
      },
      select: ['id', 'description', 'isEnable', 'startProductionDate', 'createdAt', 'updatedAt'],
      order: {
        startProductionDate: 'DESC'
      }
    });

    if (!procedures || procedures.length === 0) {
      throw new RpcException({
        message: 'No se encontraron procedimientos de préstamo activos',
        code: 404
      });
    }

    return procedures;
  }

  // Método alternativo si quieres seleccionar campos específicos
  async findAllEnabledProceduresWithSelection(): Promise<Partial<LoanProcedure>[]> {
    return this.loanProceduresRepository.find({
      where: {
        isEnable: true
      },
      select: ['id', 'description', 'startProductionDate'], // Selecciona solo los campos que necesitas
      order: {
        id: 'ASC'
      }
    });
  }
}