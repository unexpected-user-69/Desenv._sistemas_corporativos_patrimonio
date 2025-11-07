import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ReportArtifact } from './report-artifact.entity';

export enum ReportType {
  CSV = 'csv',
  PDF = 'pdf',
}

export enum ReportModel {
  PATRIMONIO = 'patrimonio',
  MANUTENCAO = 'manutencao',
  INVENTARIO = 'inventario',
  USO = 'uso',
}

export enum ReportRequestStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

@Entity({ name: 'report_requests' })
@Index('ix_report_requests_status_created_at', ['status', 'createdAt'])
@Index('ix_report_requests_created_by_created_at', ['createdById', 'createdAt'])
export class ReportRequest {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 10,
  })
  type!: ReportType;

  @Column({
    name: 'model',
    type: 'varchar',
    length: 50,
  })
  model!: ReportModel;

  @Column({
    name: 'filters_json',
    type: 'jsonb',
    nullable: true,
  })
  filtersJson?: Record<string, any>;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: ReportRequestStatus.PENDING,
  })
  status!: ReportRequestStatus;

  @Column({ name: 'created_by_id', type: 'uuid' })
  createdById!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by_id' })
  createdBy!: User;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToOne(() => ReportArtifact, (artifact) => artifact.request, { nullable: true })
  artifact?: ReportArtifact;
}

