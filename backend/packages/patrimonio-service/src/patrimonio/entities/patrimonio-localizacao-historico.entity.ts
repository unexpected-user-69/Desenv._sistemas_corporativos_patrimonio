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

@Entity({ name: 'patrimonio_localizacao_historico' })
@Index('idx_patrimonio_localizacao_historico_patrimonio_id', ['patrimonioId'])
@Index('idx_patrimonio_localizacao_historico_data_mudanca', ['dataMudanca'])
export class PatrimonioLocalizacaoHistorico {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'patrimonio_id', type: 'uuid' })
  patrimonioId!: string;

  // Relação ManyToOne com Patrimonio
  // IMPORTANTE: Usar apenas a função arrow sem o segundo parâmetro para evitar problemas de metadata
  // O segundo parâmetro (inverse relation) não é necessário para ManyToOne unidirecional
  @ManyToOne(() => Patrimonio, { 
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ 
    name: 'patrimonio_id', 
    referencedColumnName: 'id' 
  })
  patrimonio!: Patrimonio;

  @Column({ name: 'localizacao_anterior', type: 'varchar', length: 255, nullable: true })
  localizacaoAnterior?: string;

  @Column({ name: 'localizacao_nova', type: 'varchar', length: 255 })
  localizacaoNova!: string;

  @Column({ name: 'data_mudanca', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataMudanca!: Date;

  @Column({ name: 'usuario_id', type: 'uuid', nullable: true })
  usuarioId?: string;

  @Column({ name: 'observacoes', type: 'text', nullable: true })
  observacoes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;
}




