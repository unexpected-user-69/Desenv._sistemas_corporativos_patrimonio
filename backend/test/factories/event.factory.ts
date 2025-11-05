import { CreateEventDto } from '../../src/events/dto/create-event.dto';
import { Event } from '../../src/events/entities/event.entity';
import { EventType } from '../../src/events/enums/event-type.enum';
import { EventState } from '../../src/events/enums/event-state.enum';
import { EventVisibility } from '../../src/events/enums/event-visibility.enum';
import { randomUUID } from 'crypto';
import { toSlug } from '../../src/events/utils/slug.util';

let eventSeq = 1;

export function makeCreateEventDto(
  overrides?: Partial<CreateEventDto>,
): CreateEventDto {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() + 1); // Próximo mês
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 8); // 8 horas depois

  const base: CreateEventDto = {
    title: `Evento ${eventSeq}`,
    description: `Descrição do evento ${eventSeq}`,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    eventType: EventType.MANUTENCAO,
    visibility: EventVisibility.PUBLIC,
    state: EventState.DRAFT,
  };
  eventSeq++;
  return { ...base, ...(overrides ?? {}) } as CreateEventDto;
}

export function makeEventEntity(overrides?: Partial<Event>): Partial<Event> {
  const dto = makeCreateEventDto();
  const startDate = new Date(dto.startDate);
  const endDate = dto.endDate ? new Date(dto.endDate) : undefined;

  const base: Partial<Event> = {
    id: randomUUID(),
    title: dto.title,
    description: dto.description,
    slug: toSlug(dto.title),
    startDate,
    endDate,
    eventType: dto.eventType ?? EventType.MANUTENCAO,
    visibility: dto.visibility ?? EventVisibility.PUBLIC,
    state: dto.state ?? EventState.DRAFT,
    createdBy: randomUUID(),
    patrimonios: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  };
  return { ...base, ...(overrides ?? {}) };
}
