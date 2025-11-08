import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Entity para quotas de relatórios por usuário
 */
@Entity({ name: 'report_quotas' })
@Index('idx_report_quotas_user', ['userId'])
@Index('idx_report_quotas_period', ['periodStart', 'periodEnd'])
@Index('idx_report_quotas_unique', ['userId', 'periodStart', 'periodEnd'], { unique: true })
export class ReportQuota {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  /**
   * Usuário
   */
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  /**
   * Limite de relatórios por período
   */
  @Column({ name: 'limit', type: 'integer', default: 100 })
  limit!: number;

  /**
   * Quantidade usada no período
   */
  @Column({ name: 'used', type: 'integer', default: 0 })
  used!: number;

  /**
   * Início do período (mensal, semanal, diário)
   */
  @Column({ name: 'period_start', type: 'date' })
  periodStart!: Date;

  /**
   * Fim do período
   */
  @Column({ name: 'period_end', type: 'date' })
  periodEnd!: Date;

  /**
   * Tipo de período (daily, weekly, monthly)
   */
  @Column({
    name: 'period_type',
    type: 'varchar',
    length: 20,
    default: 'monthly',
  })
  periodType!: 'daily' | 'weekly' | 'monthly';

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}


