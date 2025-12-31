import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loan_interests', { schema: 'public' })
export class LoanInterest {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'procedure_modality_id', type: 'bigint' })
  procedureModalityId: number;

  @Column({ 
    name: 'annual_interest', 
    type: 'numeric', 
    precision: 5, 
    scale: 2 
  })
  annualInterest: number;

  @Column({ 
    name: 'penal_interest', 
    type: 'numeric', 
    precision: 5, 
    scale: 2 
  })
  penalInterest: number;

  @Column({ 
    name: 'created_at', 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  createdAt: Date;

  @Column({ 
    name: 'updated_at', 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updatedAt: Date;
}