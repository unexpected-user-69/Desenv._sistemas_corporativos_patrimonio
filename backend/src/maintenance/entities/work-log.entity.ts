import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { WorkOrder } from './work-order.entity';

export enum WorkLogType {
  TRABALHO = 'trabalho',
  ESPERA = 'espera',
  DESLOCAMENTO = 'deslocamento',
  OUTRO = 'outro',
}

@Entity({ name: 'work_logs' })
@Index('ix_work_logs_work_order', ['workOrderId'])
export class WorkLog {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'work_order_id', type: 'uuid' })
  workOrderId!: string;

  @ManyToOne(() => WorkOrder, (order) => order.logs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work_order_id' })
  workOrder!: WorkOrder;

  @Column({
    name: 'tipo',
    type: 'varchar',
    length: 20,
    enum: WorkLogType,
    default: WorkLogType.TRABALHO,
  })
  tipo!: WorkLogType;

  @Column({ name: 'horas', type: 'decimal', precision: 5, scale: 2 })
  horas!: number;

  @Column({ name: 'custo', type: 'decimal', precision: 10, scale: 2, default: 0 })
  custo!: number;

  @Column({ name: 'observacao', type: 'text', nullable: true })
  observacao?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;
}

