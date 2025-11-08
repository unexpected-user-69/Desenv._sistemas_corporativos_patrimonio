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
import { User } from '../../users/entities/user.entity';
import { ReportCatalog } from './report-catalog.entity';
import { UserRole } from '../../users/enums/user-role.enum';

/**
 * Entity para permissões granulares de relatórios
 * Define quais usuários/roles podem acessar quais relatórios
 */
@Entity({ name: 'report_permissions' })
@Index('idx_report_permissions_catalog', ['catalogId'])
@Index('idx_report_permissions_user', ['userId'])
@Index('idx_report_permissions_role', ['role'])
@Index('idx_report_permissions_unique', ['catalogId', 'userId', 'role'], { unique: true })
export class ReportPermission {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  /**
   * Catálogo ao qual esta permissão se refere
   */
  @Column({ name: 'catalog_id', type: 'uuid' })
  catalogId!: string;

  @ManyToOne(() => ReportCatalog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'catalog_id' })
  catalog?: ReportCatalog;

  /**
   * Usuário específico (opcional - se null, aplica-se a todos do role)
   */
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  /**
   * Role (opcional - se null, aplica-se apenas ao usuário específico)
   */
  @Column({
    name: 'role',
    type: 'varchar',
    length: 50,
    enum: UserRole,
    nullable: true,
  })
  role?: UserRole;

  /**
   * Se pode visualizar
   */
  @Column({ name: 'can_view', type: 'boolean', default: true })
  canView!: boolean;

  /**
   * Se pode gerar
   */
  @Column({ name: 'can_generate', type: 'boolean', default: true })
  canGenerate!: boolean;

  /**
   * Se pode baixar
   */
  @Column({ name: 'can_download', type: 'boolean', default: true })
  canDownload!: boolean;

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

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

