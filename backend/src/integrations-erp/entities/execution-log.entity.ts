import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Execution } from './execution.entity';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

@Entity({ name: 'execution_logs' })
@Index('ix_execution_logs_execution_created_at', ['executionId', 'createdAt'])
export class ExecutionLog {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'execution_id', type: 'uuid' })
  executionId!: string;

  @ManyToOne(() => Execution, (execution) => execution.logs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'execution_id' })
  execution!: Execution;

  @Column({
    name: 'level',
    type: 'varchar',
    length: 10,
  })
  level!: LogLevel;

  @Column({ name: 'message', type: 'text' })
  message!: string;

  @Column({ name: 'meta_json', type: 'jsonb', default: {} })
  metaJson!: Record<string, any>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;
}


