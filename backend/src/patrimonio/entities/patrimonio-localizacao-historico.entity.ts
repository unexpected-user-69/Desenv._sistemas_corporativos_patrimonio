import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Patrimonio } from './patrimonio.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'patrimonio_localizacao_historico' })
@Index('idx_patrimonio_localizacao_historico_patrimonio_id', ['patrimonioId'])
@Index('idx_patrimonio_localizacao_historico_data_mudanca', ['dataMudanca'])
export class PatrimonioLocalizacaoHistorico {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'patrimonio_id', type: 'uuid' })
  patrimonioId!: string;

  @ManyToOne(() => Patrimonio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patrimonio_id' })
  patrimonio!: Patrimonio;

  @Column({ name: 'localizacao_anterior', type: 'varchar', length: 255, nullable: true })
  localizacaoAnterior?: string;

  @Column({ name: 'localizacao_nova', type: 'varchar', length: 255 })
  localizacaoNova!: string;

  @Column({ name: 'data_mudanca', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataMudanca!: Date;

  @Column({ name: 'usuario_id', type: 'uuid', nullable: true })
  usuarioId?: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: User;

  @Column({ name: 'observacoes', type: 'text', nullable: true })
  observacoes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;
}

