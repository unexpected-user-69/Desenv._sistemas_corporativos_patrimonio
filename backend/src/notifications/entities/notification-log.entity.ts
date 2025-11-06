import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
  DELIVERED = 'delivered',
}

@Entity('notification_logs')
@Index(['eventKey'])
@Index(['channel', 'status', 'createdAt'])
export class NotificationLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, name: 'event_key' })
  eventKey!: string;

  @Column({ type: 'varchar', length: 20 })
  channel!: string;

  @Column({
    type: 'varchar',
    length: 20,
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status!: NotificationStatus;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ type: 'int', nullable: true, name: 'duration_ms' })
  durationMs?: number; // Tempo de processamento em ms

  @Column({ type: 'text', nullable: true })
  error?: string; // Mensagem de erro se falhou

  @Column({ type: 'varchar', length: 500, nullable: true })
  recipient?: string; // Email, URL do webhook, etc.

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}

