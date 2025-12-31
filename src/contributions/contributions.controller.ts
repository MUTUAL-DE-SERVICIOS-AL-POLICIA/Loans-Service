import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContributionsService } from './contributions.service';

@Controller()
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @MessagePattern('LoansContributions.findByAffiliateId')
  findByAffiliateId(@Payload() affiliateId: number) {
    return this.contributionsService.findByAffiliateId(affiliateId);
  }
}
