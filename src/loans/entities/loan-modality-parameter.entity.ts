import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'loan_modality_parameters', schema: 'public' })
export class LoanModalityParameter {
  // La tabla usa procedure_modality_id como llave primaria (bigint)
  @PrimaryColumn({ type: 'bigint', name: 'procedure_modality_id' })
  procedureModalityId: number;

  @Column({ type: 'double precision', name: 'debt_index', nullable: true })
  debtIndex?: number;

  @Column({ type: 'smallint', name: 'quantity_ballots' })
  quantityBallots: number;

  @Column({ type: 'smallint', name: 'guarantors' })
  guarantors: number;

  @Column({ type: 'smallint', name: 'max_lenders' })
  maxLenders: number;

  @Column({ type: 'double precision', name: 'min_guarantor_category', nullable: true })
  minGuarantorCategory?: number;

  @Column({ type: 'double precision', name: 'max_guarantor_category', nullable: true })
  maxGuarantorCategory?: number;

  @Column({ type: 'double precision', name: 'min_lender_category', nullable: true })
  minLenderCategory?: number;

  @Column({ type: 'double precision', name: 'max_lender_category', nullable: true })
  maxLenderCategory?: number;

  @Column({ type: 'integer', name: 'max_cosigner' })
  maxCosigner: number;

  @Column({ type: 'boolean', name: 'personal_reference' })
  personalReference: boolean;

  @Column({ type: 'integer', name: 'maximum_amount_modality', nullable: true })
  maximumAmountModality?: number;

  @Column({ type: 'integer', name: 'minimum_amount_modality', nullable: true })
  minimumAmountModality?: number;

  @Column({ type: 'smallint', name: 'maximum_term_modality', nullable: true })
  maximumTermModality?: number;

  @Column({ type: 'smallint', name: 'minimum_term_modality', nullable: true })
  minimumTermModality?: number;

  @Column({ type: 'boolean', name: 'print_contract_platform' })
  printContractPlatform: boolean;

  @Column({ type: 'boolean', name: 'print_receipt_fund_rotary' })
  printReceiptFundRotary: boolean;

  @Column({ type: 'boolean', name: 'print_form_qualification_platform' })
  printFormQualificationPlatform: boolean;

  @Column({ type: 'bigint', name: 'loan_procedure_id', nullable: true })
  loanProcedureId?: number;

  @Column({ type: 'double precision', name: 'max_approved_amount', nullable: true })
  maxApprovedAmount?: number;

  @Column({ type: 'double precision', name: 'guarantor_debt_index', nullable: true })
  guarantorDebtIndex?: number;

  @Column({ type: 'double precision', name: 'loan_month_term' })
  loanMonthTerm: number;

  @Column({ type: 'double precision', name: 'coverage_percentage' })
  coveragePercentage: number;

  @Column({ type: 'double precision', name: 'eval_percentage', nullable: true })
  evalPercentage?: number;

  @Column({ type: 'double precision', name: 'suggested_debt_index' })
  suggestedDebtIndex: number;
}