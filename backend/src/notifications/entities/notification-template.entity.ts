import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum NotificationChannel {
  EMAIL = 'email',
  WEBHOOK = 'webhook',
  SLACK = 'slack',
  TEAMS = 'teams',
}

@Entity('notification_templates')
@Index(['key', 'version'], { unique: true })
@Index(['channel'])
export class NotificationTemplate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  key!: string; // Ex: 'patrimonio.status.changed', 'maintenance.scheduled'

  @Column({ type: 'int', default: 1 })
  version!: number;

  @Column({
    type: 'varchar',
    length: 20,
    enum: NotificationChannel,
  })
  channel!: NotificationChannel;

  @Column({ type: 'varchar', length: 200, nullable: true })
  subject?: string; // Para email

  @Column({ type: 'text' })
  body!: string; // Template body (Handlebars/Nunjucks)

  @Column({ type: 'varchar', length: 10, default: 'pt-BR' })
  locale!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;
}

