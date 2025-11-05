import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Event } from './event.entity';
import { Patrimonio } from '../../patrimonio/entities/patrimonio.entity';

@Entity({ name: 'event_patrimonios' })
@Index(['eventId', 'patrimonioId'], { unique: true })
@Index('idx_event_patrimonios_event', ['eventId'])
@Index('idx_event_patrimonios_patrimonio', ['patrimonioId'])
export class EventPatrimonio {
  @PrimaryColumn({ name: 'event_id', type: 'uuid' })
  eventId!: string;

  @PrimaryColumn({ name: 'patrimonio_id', type: 'uuid' })
  patrimonioId!: string;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @ManyToOne(() => Patrimonio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patrimonio_id' })
  patrimonio!: Patrimonio;
}
