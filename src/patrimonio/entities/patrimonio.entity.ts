import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export enum PatrimonioStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  MANUTENCAO = 'MANUTENCAO',
  DESCARTADO = 'DESCARTADO',
}

export enum PatrimonioCategoria {
  EQUIPAMENTO = 'EQUIPAMENTO',
  MOBILIARIO = 'MOBILIARIO',
  VEICULO = 'VEICULO',
  IMOVEL = 'IMOVEL',
  OUTROS = 'OUTROS',
}

@Entity({ name: 'patrimonios' })
@Index('uq_patrimonios_codigo', ['codigo'], { unique: true })
@Index('idx_patrimonios_categoria', ['categoria'])
@Index('idx_patrimonios_status', ['status'])
@Index('idx_patrimonios_responsavel', ['responsavelId'])
export class Patrimonio {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'codigo', type: 'varchar', length: 50, unique: true })
  codigo!: string;

  @Column({ name: 'nome', type: 'varchar', length: 255 })
  nome!: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao?: string;

  @Column({
    name: 'categoria',
    type: 'varchar',
    length: 50,
    enum: PatrimonioCategoria,
    default: PatrimonioCategoria.EQUIPAMENTO,
  })
  categoria!: PatrimonioCategoria;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 50,
    enum: PatrimonioStatus,
    default: PatrimonioStatus.ATIVO,
  })
  status!: PatrimonioStatus;

  @Column({
    name: 'valor_aquisicao',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  valorAquisicao?: number;

  @Column({ name: 'data_aquisicao', type: 'date', nullable: true })
  dataAquisicao?: Date;

  @Column({ name: 'data_garantia', type: 'date', nullable: true })
  dataGarantia?: Date;

  @Column({
    name: 'numero_serie',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  numeroSerie?: string;

  @Column({ name: 'modelo', type: 'varchar', length: 255, nullable: true })
  modelo?: string;

  @Column({ name: 'marca', type: 'varchar', length: 255, nullable: true })
  marca?: string;

  @Column({ name: 'localizacao', type: 'varchar', length: 255, nullable: true })
  localizacao?: string;

  @Column({ name: 'observacoes', type: 'text', nullable: true })
  observacoes?: string;

  @Column({ name: 'foto_url', type: 'varchar', length: 500, nullable: true })
  fotoUrl?: string;

  @Column({ name: 'responsavel_id', type: 'uuid', nullable: true })
  responsavelId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'responsavel_id' })
  responsavel?: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deletedAt?: Date;

  @VersionColumn({ name: 'version', type: 'int', default: 1 })
  version!: number;
}
