import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'contributions', synchronize: false })
export class Contribution {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'affiliate_id', type: 'bigint' })
  affiliateId: number;

  @Column({ name: 'degree_id', type: 'bigint', nullable: true })
  degreeId: number;

  @Column({ name: 'unit_id', type: 'bigint', nullable: true })
  unitId: number;

  @Column({ name: 'breakdown_id', type: 'bigint', nullable: true })
  breakdownId: number;

  @Column({ name: 'category_id', type: 'bigint', nullable: true })
  categoryId: number;

  @Column({ name: 'month_year', type: 'date' })
  monthYear: Date;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ name: 'base_wage', type: 'numeric' })
  baseWage: number;

  @Column({ name: 'seniority_bonus', type: 'numeric' })
  seniorityBonus: number;

  @Column({ name: 'study_bonus', type: 'numeric' })
  studyBonus: number;

  @Column({ name: 'position_bonus', type: 'numeric' })
  positionBonus: number;

  @Column({ name: 'border_bonus', type: 'numeric' })
  borderBonus: number;

  @Column({ name: 'east_bonus', type: 'numeric' })
  eastBonus: number;

  @Column({ name: 'public_security_bonus', type: 'numeric', nullable: true })
  publicSecurityBonus: number;

  @Column({ type: 'numeric' })
  gain: number;

  @Column({ name: 'payable_liquid', type: 'numeric', nullable: true })
  payableLiquid: number;

  @Column({ type: 'numeric' })
  quotable: number;

  @Column({ name: 'retirement_fund', type: 'numeric' })
  retirementFund: number;

  @Column({ name: 'mortuary_quota', type: 'numeric' })
  mortuaryQuota: number;

  @Column({ type: 'numeric', nullable: true })
  subtotal: number;

  @Column({ type: 'numeric', nullable: true })
  interest: number;

  @Column({ type: 'numeric' })
  total: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ name: 'contribution_type_id', type: 'bigint', nullable: true })
  contributionTypeId: number;

  @Column({ name: 'contributionable_type', type: 'varchar', length: 255, nullable: true })
  contributionableType: string;

  @Column({ name: 'contributionable_id', type: 'bigint', nullable: true })
  contributionableId: number;

  @Column({ name: 'contribution_type_mortuary_id', type: 'bigint', nullable: true })
  contributionTypeMortuaryId: number;
}
