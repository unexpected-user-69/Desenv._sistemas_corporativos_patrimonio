import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Patrimonio } from '../../patrimonio/entities/patrimonio.entity';
import { User } from '../../shared/entities/user.entity';
import { WorkLog } from './work-log.entity';
import { Part } from './part.entity';

export enum WorkOrderStatus {
  ABERTA = 'aberta',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
  VALIDADA = 'validada',
  CANCELADA = 'cancelada',
}

export enum Prioridade {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  URGENTE = 'urgente',
}

@Entity({ name: 'work_orders' })
@Index('ix_work_orders_status_opened_at', ['status', 'openedAt'])
@Index('ix_work_orders_patrimonio_status', ['patrimonioId', 'status'])
@Index('ix_work_orders_owner_opened_at', ['ownerId', 'openedAt'])
export class WorkOrder {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'patrimonio_id', type: 'uuid' })
  patrimonioId!: string;

  // Relação removida pois Patrimonio agora é um microsserviço
  // @ManyToOne(() => Patrimonio, { nullable: false })
  // @JoinColumn({ name: 'patrimonio_id' })
  // patrimonio!: Patrimonio;

  // Propriedade virtual para uso no código (populada manualmente via HTTP Client)
  patrimonio?: Patrimonio;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: WorkOrderStatus.ABERTA,
    enum: WorkOrderStatus,
  })
  status!: WorkOrderStatus;

  @Column({ name: 'titulo', type: 'varchar', length: 200 })
  titulo!: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao?: string;

  @Column({
    name: 'prioridade',
    type: 'varchar',
    length: 20,
    default: Prioridade.MEDIA,
    enum: Prioridade,
  })
  prioridade!: Prioridade;

  @Column({ name: 'opened_at', type: 'timestamp with time zone' })
  openedAt!: Date;

  @Column({ name: 'closed_at', type: 'timestamp with time zone', nullable: true })
  closedAt?: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @OneToMany(() => WorkLog, (log) => log.workOrder)
  logs!: WorkLog[];

  @OneToMany(() => Part, (part) => part.workOrder)
  parts!: Part[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}

