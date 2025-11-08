import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Connector } from './connector.entity';
import { ExecutionLog } from './execution-log.entity';

export enum ExecutionType {
  IMPORT = 'import',
  EXPORT = 'export',
}

export enum ExecutionStatus {
  QUEUED = 'queued',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELED = 'canceled',
}

@Entity({ name: 'executions' })
@Index('ix_executions_connector_status_started_at', [
  'connectorId',
  'status',
  'startedAt',
])
@Index('ix_executions_created_by_started_at', ['createdBy', 'startedAt'])
export class Execution {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'connector_id', type: 'uuid' })
  connectorId!: string;

  @ManyToOne(() => Connector, { nullable: false })
  @JoinColumn({ name: 'connector_id' })
  connector!: Connector;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 16,
  })
  type!: ExecutionType;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 16,
  })
  status!: ExecutionStatus;

  @Column({ name: 'started_at', type: 'timestamp with time zone', nullable: true })
  startedAt?: Date;

  @Column({ name: 'finished_at', type: 'timestamp with time zone', nullable: true })
  finishedAt?: Date;

  @Column({ name: 'error', type: 'text', nullable: true })
  error?: string;

  @Column({ name: 'created_by', type: 'varchar', length: 120, nullable: true })
  createdBy?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @OneToMany(() => ExecutionLog, (log) => log.execution, { cascade: true })
  logs!: ExecutionLog[];
}




