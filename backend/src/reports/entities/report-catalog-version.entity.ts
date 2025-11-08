import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ReportCatalog } from './report-catalog.entity';
import { User } from '../../users/entities/user.entity';

/**
 * Entity para versionamento de relatórios no catálogo
 */
@Entity({ name: 'report_catalog_versions' })
@Index('idx_report_catalog_versions_catalog', ['catalogId'])
@Index('idx_report_catalog_versions_version', ['version'])
export class ReportCatalogVersion {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  /**
   * Catálogo ao qual esta versão pertence
   */
  @Column({ name: 'catalog_id', type: 'uuid' })
  catalogId!: string;

  @ManyToOne(() => ReportCatalog, (catalog) => catalog.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'catalog_id' })
  catalog?: ReportCatalog;

  /**
   * Versão (ex: '1.0.0', '1.1.0', '2.0.0')
   */
  @Column({ name: 'version', type: 'varchar', length: 20 })
  version!: string;

  /**
   * Changelog da versão
   */
  @Column({ name: 'changelog', type: 'text', nullable: true })
  changelog?: string;

  /**
   * Filtros desta versão (JSON)
   */
  @Column({ name: 'filters', type: 'jsonb', nullable: true })
  filters?: Record<string, any>;

  /**
   * Se é a versão atual
   */
  @Column({ name: 'is_current', type: 'boolean', default: false })
  isCurrent!: boolean;

  /**
   * Criado por
   */
  @Column({ name: 'created_by_id', type: 'uuid' })
  createdById!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by_id' })
  createdBy?: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

