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
import { Campaign } from './campaign.entity';
import { CollectedItem } from './collected-item.entity';

export enum AssignmentStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Entity({ name: 'assignments' })
@Index('ix_assignments_campaign_status', ['campaignId', 'status'])
@Index('ix_assignments_coletor_status', ['coletorId', 'status'])
export class Assignment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'campaign_id', type: 'uuid' })
  campaignId!: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.assignments, {
    nullable: false,
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign!: Campaign;

  @Column({ name: 'coletor_id', type: 'uuid' })
  coletorId!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'coletor_id' })
  coletor!: User;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: AssignmentStatus.PENDING,
  })
  status!: AssignmentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToMany(() => CollectedItem, (item) => item.assignment)
  collectedItems!: CollectedItem[];
}

