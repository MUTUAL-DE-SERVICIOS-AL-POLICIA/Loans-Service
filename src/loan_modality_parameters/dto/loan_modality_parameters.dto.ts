export class LoanModalityParameterDto {
  procedureModalityId: number;
  debtIndex?: number;
  quantityBallots?: number;
  guarantors?: number;
  maxLenders?: number;
  minGuarantorCategory?: number;
  maxGuarantorCategory?: number;
  minLenderCategory?: number;
  maxLenderCategory?: number;
  maxCosigner?: number;
  personalReference?: boolean;
  maximumAmountModality?: number;
  minimumAmountModality?: number;
  maximumTermModality?: number;
  minimumTermModality?: number;
  printContractPlatform?: boolean;
  printReceiptFundRotary?: boolean;
  printFormQualificationPlatform?: boolean;
  loanProcedureId?: number;
  maxApprovedAmount?: number;
  guarantorDebtIndex?: number;
  loanMonthTerm?: number;
  coveragePercentage?: number;
  evalPercentage?: number;
  suggestedDebtIndex?: number;
}