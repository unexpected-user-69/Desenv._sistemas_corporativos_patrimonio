import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Event } from '../../../src/events/entities/event.entity';
import { EventPatrimonio } from '../../../src/events/entities/event-patrimonio.entity';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { EventsService } from '../../../src/events/events.service';
import { makeEventEntity } from '../../factories/event.factory';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UpdateEventDto } from '../../../src/events/dto/update-event.dto';
import { randomUUID } from 'crypto';

describe('EventsService.update (unit)', () => {
  let service: EventsService;
  let eventRepository: MockType<Repository<Event>>;
  let eventPatrimonioRepository: MockType<Repository<EventPatrimonio>>;
  let patrimonioRepository: MockType<Repository<Patrimonio>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(EventPatrimonio),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(EventsService);
    eventRepository = module.get(getRepositoryToken(Event));
    eventPatrimonioRepository = module.get(getRepositoryToken(EventPatrimonio));
    patrimonioRepository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should update event successfully', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const existingEvent = makeEventEntity({ id: eventId, createdBy: userId });
    const updatedEvent = makeEventEntity({
      ...existingEvent,
      title: 'Título Atualizado',
    });
    const updateDto: UpdateEventDto = { title: 'Título Atualizado' };

    eventRepository.findOne.mockResolvedValueOnce(existingEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(null); // Slug check
    eventRepository.save.mockResolvedValue(updatedEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(updatedEvent as Event);

    const result = await service.update(eventId, updateDto, {
      userId,
      isAdmin: false,
    });

    expect(eventRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('should throw NotFoundException when event not found', async () => {
    const eventId = randomUUID();
    eventRepository.findOne.mockResolvedValue(null);

    await expect(
      service.update(eventId, {}, { userId: randomUUID(), isAdmin: false }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw ForbiddenException when user is not creator or admin', async () => {
    const userId = randomUUID();
    const otherUserId = randomUUID();
    const eventId = randomUUID();
    const event = makeEventEntity({ id: eventId, createdBy: userId });

    eventRepository.findOne.mockResolvedValue(event as Event);

    await expect(
      service.update(eventId, {}, { userId: otherUserId, isAdmin: false }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow admin to update any event', async () => {
    const userId = randomUUID();
    const adminId = randomUUID();
    const eventId = randomUUID();
    const event = makeEventEntity({ id: eventId, createdBy: userId });
    const updatedEvent = makeEventEntity({ ...event, title: 'Atualizado' });

    eventRepository.findOne.mockResolvedValueOnce(event as Event);
    eventRepository.findOne.mockResolvedValueOnce(null); // Slug check
    eventRepository.save.mockResolvedValue(updatedEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(updatedEvent as Event);

    const result = await service.update(
      eventId,
      { title: 'Atualizado' },
      { userId: adminId, isAdmin: true },
    );

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException when endDate is before startDate', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const event = makeEventEntity({
      id: eventId,
      createdBy: userId,
      startDate: new Date('2025-02-01T10:00:00Z'),
    });
    const updateDto: UpdateEventDto = {
      endDate: '2025-02-01T08:00:00Z', // Antes do startDate
    };

    eventRepository.findOne.mockResolvedValue(event as Event);

    await expect(
      service.update(eventId, updateDto, { userId, isAdmin: false }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should update patrimonios when provided', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const patrimonio1 = makePatrimonioEntity({ id: randomUUID() });
    const patrimonio2 = makePatrimonioEntity({ id: randomUUID() });
    const event = makeEventEntity({ id: eventId, createdBy: userId });
    const updatedEvent = makeEventEntity({
      ...event,
      patrimonios: [patrimonio1, patrimonio2] as Patrimonio[],
    });

    const updateDto: UpdateEventDto = {
      patrimonioIds: [patrimonio1.id!, patrimonio2.id!],
    };

    eventRepository.findOne.mockResolvedValueOnce(event as Event);
    patrimonioRepository.find.mockResolvedValue([
      patrimonio1,
      patrimonio2,
    ] as Patrimonio[]);
    eventPatrimonioRepository.delete.mockResolvedValue({ affected: 0 } as any);
    eventPatrimonioRepository.create.mockImplementation(
      (entity) => entity as EventPatrimonio,
    );
    eventPatrimonioRepository.save.mockResolvedValue([]);
    eventRepository.findOne.mockResolvedValueOnce(null); // Slug check
    eventRepository.save.mockResolvedValue(updatedEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(updatedEvent as Event);

    const result = await service.update(eventId, updateDto, {
      userId,
      isAdmin: false,
    });

    expect(eventPatrimonioRepository.delete).toHaveBeenCalledWith({
      eventId,
    });
    expect(patrimonioRepository.find).toHaveBeenCalledWith({
      where: { id: In(updateDto.patrimonioIds) },
      select: ['id'],
    });
    expect(result).toBeDefined();
  });

  it('should generate new slug when title changes', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const event = makeEventEntity({
      id: eventId,
      createdBy: userId,
      title: 'Título Original',
      slug: 'titulo-original',
    });
    const updatedEvent = makeEventEntity({
      ...event,
      title: 'Novo Título',
      slug: 'novo-titulo',
    });
    const updateDto: UpdateEventDto = { title: 'Novo Título' };

    eventRepository.findOne.mockResolvedValueOnce(event as Event);
    eventRepository.findOne.mockResolvedValueOnce(null); // Slug não existe
    eventRepository.save.mockResolvedValue(updatedEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(updatedEvent as Event);

    await service.update(eventId, updateDto, { userId, isAdmin: false });

    expect(eventRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'novo-titulo',
      }),
    );
  });
});
