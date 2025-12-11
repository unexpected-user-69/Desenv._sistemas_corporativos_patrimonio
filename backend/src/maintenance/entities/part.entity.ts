import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { WorkOrder } from './work-order.entity';

@Entity({ name: 'parts' })
@Index('ix_parts_work_order', ['workOrderId'])
export class Part {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'work_order_id', type: 'uuid' })
  workOrderId!: string;

  @ManyToOne(() => WorkOrder, (order) => order.parts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work_order_id' })
  workOrder!: WorkOrder;

  @Column({ name: 'descricao', type: 'varchar', length: 200 })
  descricao!: string;

  @Column({ name: 'quantidade', type: 'int', default: 1 })
  quantidade!: number;

  @Column({ name: 'custo_unitario', type: 'decimal', precision: 10, scale: 2 })
  custoUnitario!: number;
}

