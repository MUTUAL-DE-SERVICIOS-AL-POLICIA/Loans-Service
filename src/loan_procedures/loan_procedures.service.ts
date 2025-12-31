import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { LoanProcedure } from './entities/loan_procedures.entity';

@Injectable()
export class LoanProceduresService {
  constructor(
    @InjectRepository(LoanProcedure)
    private readonly loanProcedureRepository: Repository<LoanProcedure>,
  ) {}

  async findAllEnabled(): Promise<LoanProcedure[]> {
    const procedures = await this.loanProcedureRepository.find({
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
  async findAllEnabledWithSelection(): Promise<Partial<LoanProcedure>[]> {
    return this.loanProcedureRepository.find({
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