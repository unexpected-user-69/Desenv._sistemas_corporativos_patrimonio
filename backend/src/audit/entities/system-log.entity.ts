import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

@Entity('system_logs')
@Index(['level', 'timestamp'])
@Index(['service', 'timestamp'])
@Index(['module', 'function'])
export class SystemLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: LogLevel,
    default: LogLevel.INFO,
  })
  level: LogLevel;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  context: Record<string, any>;

  @Column({ type: 'varchar', length: 100, nullable: true })
  service: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  module: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  function: string;

  @Column({ type: 'text', nullable: true })
  stackTrace: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({ type: 'inet', nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  endpoint: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  method: string;

  @Column({ type: 'int', nullable: true })
  statusCode: number;

  @Column({ type: 'int', nullable: true })
  responseTime: number;

  @CreateDateColumn()
  timestamp: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
