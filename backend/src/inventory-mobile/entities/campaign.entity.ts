import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Assignment } from './assignment.entity';
import { Reconciliation } from './reconciliation.entity';

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Entity({ name: 'campaigns' })
@Index('ix_campaigns_owner_status_periodo', ['ownerId', 'status', 'periodoInicio'])
export class Campaign {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'nome', type: 'varchar', length: 200 })
  nome!: string;

  @Column({ name: 'local', type: 'varchar', length: 200 })
  local!: string;

  @Column({ name: 'periodo_inicio', type: 'timestamp with time zone' })
  periodoInicio!: Date;

  @Column({ name: 'periodo_fim', type: 'timestamp with time zone' })
  periodoFim!: Date;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: CampaignStatus.DRAFT,
  })
  status!: CampaignStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToMany(() => Assignment, (assignment) => assignment.campaign)
  assignments!: Assignment[];

  @OneToMany(() => Reconciliation, (reconciliation) => reconciliation.campaign)
  reconciliations!: Reconciliation[];
}

