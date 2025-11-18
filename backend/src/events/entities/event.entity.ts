import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { Patrimonio } from '../../patrimonio/entities/patrimonio.entity';
import { EventType } from '../enums/event-type.enum';
import { EventVisibility } from '../enums/event-visibility.enum';
import { EventState } from '../enums/event-state.enum';

@Entity({ name: 'events' })
@Index('uq_events_slug', ['slug'], { unique: true })
@Index('idx_events_created_by', ['createdBy'])
@Index('idx_events_start_date', ['startDate'])
@Index('idx_events_event_type', ['eventType'])
@Index('idx_events_state', ['state'])
export class Event {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title!: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'slug', type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ name: 'start_date', type: 'timestamp with time zone' })
  startDate!: Date;

  @Column({
    name: 'end_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  endDate?: Date;

  @Column({
    name: 'event_type',
    type: 'varchar',
    length: 50,
    enum: EventType,
    default: EventType.OUTROS,
  })
  eventType!: EventType;

  @Column({
    name: 'visibility',
    type: 'varchar',
    length: 50,
    enum: EventVisibility,
    default: EventVisibility.PUBLIC,
  })
  visibility!: EventVisibility;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 50,
    enum: EventState,
    default: EventState.DRAFT,
  })
  state!: EventState;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  creator!: User;

  @ManyToMany(() => Patrimonio, {
    nullable: true,
  })
  @JoinTable({
    name: 'event_patrimonios',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'patrimonio_id', referencedColumnName: 'id' },
  })
  patrimonios?: Patrimonio[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deletedAt?: Date;

  @VersionColumn({ name: 'version', type: 'int', default: 1 })
  version!: number;
}
