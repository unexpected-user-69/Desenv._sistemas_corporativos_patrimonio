import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportRequest } from './report-request.entity';

@Entity({ name: 'report_artifacts' })
@Index('ix_report_artifacts_request_id', ['requestId'])
@Index('ix_report_artifacts_expires_at', ['expiresAt'])
export class ReportArtifact {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'request_id', type: 'uuid', unique: true })
  requestId!: string;

  @ManyToOne(() => ReportRequest, (request) => request.artifact, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id' })
  request!: ReportRequest;

  @Column({ name: 'storage_key', type: 'varchar', length: 500 })
  storageKey!: string;

  @Column({ name: 'mime', type: 'varchar', length: 100 })
  mime!: string;

  @Column({ name: 'size_bytes', type: 'bigint' })
  sizeBytes!: number;

  @Column({ name: 'expires_at', type: 'timestamp with time zone', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;
}




