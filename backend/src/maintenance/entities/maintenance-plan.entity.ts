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
import { Categoria } from '../../categorias/entities/categoria.entity';
import { User } from '../../users/entities/user.entity';

export enum Periodicidade {
  DIARIA = 'diaria',
  SEMANAL = 'semanal',
  QUINZENAL = 'quinzenal',
  MENSAL = 'mensal',
  BIMESTRAL = 'bimestral',
  TRIMESTRAL = 'trimestral',
  SEMESTRAL = 'semestral',
  ANUAL = 'anual',
}

@Entity({ name: 'maintenance_plans' })
@Index('ix_maintenance_plans_categoria', ['categoriaId'])
@Index('ix_maintenance_plans_owner', ['ownerId'])
export class MaintenancePlan {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'categoria_id', type: 'uuid' })
  categoriaId!: string;

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;

  @Column({
    name: 'periodicidade',
    type: 'varchar',
    length: 20,
    enum: Periodicidade,
  })
  periodicidade!: Periodicidade;

  @Column({ name: 'proxima_execucao', type: 'timestamp with time zone' })
  proximaExecucao!: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;
}

