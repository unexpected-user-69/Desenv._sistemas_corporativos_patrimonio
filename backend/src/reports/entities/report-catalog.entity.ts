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
import { User } from '../../shared/entities/user.entity';
import { ReportCatalogVersion } from './report-catalog-version.entity';
import { ReportType, ReportModel } from './report-request.entity';

/**
 * Entity para catálogo de relatórios
 * Define modelos de relatórios disponíveis no sistema
 */
@Entity({ name: 'report_catalogs' })
@Index('idx_report_catalogs_key', ['key'], { unique: true })
@Index('idx_report_catalogs_active', ['active'])
export class ReportCatalog {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  /**
   * Chave única do relatório (ex: 'patrimonio-inventario-completo')
   */
  @Column({ name: 'key', type: 'varchar', length: 100, unique: true })
  key!: string;

  /**
   * Nome do relatório
   */
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name!: string;

  /**
   * Descrição do relatório
   */
  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  /**
   * Tipo de relatório (CSV ou PDF)
   */
  @Column({
    name: 'type',
    type: 'varchar',
    length: 10,
    enum: ReportType,
  })
  type!: ReportType;

  /**
   * Modelo de dados do relatório
   */
  @Column({
    name: 'model',
    type: 'varchar',
    length: 50,
    enum: ReportModel,
  })
  model!: ReportModel;

  /**
   * Filtros padrão (JSON)
   */
  @Column({ name: 'default_filters', type: 'jsonb', nullable: true })
  defaultFilters?: Record<string, any>;

  /**
   * Versão atual do relatório
   */
  @Column({ name: 'current_version', type: 'varchar', length: 20, default: '1.0.0' })
  currentVersion!: string;

  /**
   * Se o relatório está ativo
   */
  @Column({ name: 'active', type: 'boolean', default: true })
  active!: boolean;

  /**
   * Se o relatório requer permissões especiais
   */
  @Column({ name: 'requires_permission', type: 'boolean', default: false })
  requiresPermission!: boolean;

  /**
   * Criado por
   */
  @Column({ name: 'created_by_id', type: 'uuid' })
  createdById!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by_id' })
  createdBy?: User;

  /**
   * Atualizado por
   */
  @Column({ name: 'updated_by_id', type: 'uuid', nullable: true })
  updatedById?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy?: User;

  /**
   * Versões do relatório
   */
  @OneToMany(() => ReportCatalogVersion, (version) => version.catalog, { cascade: true })
  versions?: ReportCatalogVersion[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}


