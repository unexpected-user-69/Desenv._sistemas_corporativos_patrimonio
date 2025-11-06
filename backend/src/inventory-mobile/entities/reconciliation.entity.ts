import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';

export enum ReconciliationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Divergencia {
  patrimonioId: string;
  codigoLido: string;
  tipo: 'nao_encontrado' | 'localizacao_diferente' | 'status_diferente' | 'dados_inconsistentes';
  detalhes: Record<string, any>;
}

@Entity({ name: 'reconciliations' })
@Index('ix_reconciliations_campaign_status', ['campaignId', 'status'])
export class Reconciliation {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'campaign_id', type: 'uuid' })
  campaignId!: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.reconciliations, {
    nullable: false,
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign!: Campaign;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: ReconciliationStatus.PENDING,
  })
  status!: ReconciliationStatus;

  @Column({
    name: 'divergencias_json',
    type: 'jsonb',
    default: '[]',
  })
  divergenciasJson!: Divergencia[];

  @Column({ name: 'executed_at', type: 'timestamp with time zone', nullable: true })
  executedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}

