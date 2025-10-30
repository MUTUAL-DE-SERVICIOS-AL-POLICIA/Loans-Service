import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanInterest } from './entities/loan_interests.entity';

@Injectable()
export class LoanInterestsService {
  constructor(
    @InjectRepository(LoanInterest)
    private readonly loanInterestsRepository: Repository<LoanInterest>,
  ) {}

  /**
   * **Encuentra todos los registros de intereses de préstamos.**
   * @param columns - Array opcional de columnas a seleccionar
   * @returns Una promesa que resuelve con un array de objetos LoanInterest
   */
  async findAll(columns?: string[]): Promise<LoanInterest[]> {
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
  async findOne(id: number): Promise<LoanInterest> {
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
  async findByProcedureModality(procedureModalityId: number): Promise<LoanInterest[]> {
    return this.loanInterestsRepository.find({
      where: { procedureModalityId },
    });
  }
}