import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignment } from './assignment.entity';

export enum TipoLeitura {
  QRCODE = 'qrcode',
  RFID = 'rfid',
}

@Entity({ name: 'collected_items' })
@Index('ix_collected_items_assignment_coletado', ['assignmentId', 'coletadoEm'])
@Index('ix_collected_items_patrimonio_coletado', ['patrimonioId', 'coletadoEm'])
@Index('ix_collected_items_offline_batch', ['offlineBatchId'])
export class CollectedItem {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'assignment_id', type: 'uuid' })
  assignmentId!: string;

  @ManyToOne(() => Assignment, (assignment) => assignment.collectedItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'assignment_id' })
  assignment!: Assignment;

  @Column({ name: 'patrimonio_id', type: 'uuid', nullable: true })
  patrimonioId?: string;

  @Column({ name: 'codigo_lido', type: 'varchar', length: 100 })
  codigoLido!: string;

  @Column({
    name: 'tipo_leitura',
    type: 'varchar',
    length: 10,
  })
  tipoLeitura!: TipoLeitura;

  @Column({
    name: 'coletado_em',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  coletadoEm!: Date;

  @Column({ name: 'geo', type: 'jsonb', nullable: true })
  geo?: { lat: number; lng: number; accuracy?: number };

  @Column({ name: 'offline_batch_id', type: 'uuid', nullable: true })
  offlineBatchId?: string;

  @Column({ name: 'version', type: 'int', default: 1 })
  version!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;
}

