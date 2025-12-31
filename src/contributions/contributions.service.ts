import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Contribution } from './entities/contribution.entity';

@Injectable()
export class ContributionsService {
  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
  ) {}

  async findByAffiliateId(affiliateId: number): Promise<Contribution[]> {
    if (!affiliateId) {
      throw new RpcException({
        message: 'El affiliate_id es requerido',
        code: 400
      });
    }

    try {
      const contributions = await this.contributionRepository.find({
        where: { affiliateId: Number(affiliateId) },
        order: { monthYear: 'DESC' },
        cache: {
          id: `contributions_affiliate_${affiliateId}`,
          milliseconds: 60000 // Cache por 1 minuto
        }
      });

      return contributions;
    } catch (error) {
      throw new RpcException({
        message: `Error al consultar contribuciones: ${error.message}`,
        code: 500
      });
    }
  }
}
