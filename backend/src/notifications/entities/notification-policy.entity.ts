import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('notification_policies')
@Index(['eventKey'])
@Index(['enabled'])
export class NotificationPolicy {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, name: 'event_key' })
  eventKey!: string; // Ex: 'events.patrimonio.status.changed'

  @Column({
    type: 'varchar',
    length: 20,
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM,
  })
  priority!: NotificationPriority;

  @Column({ type: 'varchar', array: true, default: [] })
  channels!: string[]; // ['email', 'webhook']

  @Column({ type: 'boolean', default: true })
  enabled!: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;
}

