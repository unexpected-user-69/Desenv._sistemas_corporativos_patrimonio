import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Event } from '../../../src/events/entities/event.entity';
import { EventPatrimonio } from '../../../src/events/entities/event-patrimonio.entity';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { EventsService } from '../../../src/events/events.service';
import { makeEventEntity } from '../../factories/event.factory';
import { EventState } from '../../../src/events/enums/event-state.enum';
import { randomUUID } from 'crypto';

describe('EventsService.findOneByIdOrSlug (unit)', () => {
  let service: EventsService;
  let eventRepository: MockType<Repository<Event>>;

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
  });

  it('should find event by UUID', async () => {
    const eventId = randomUUID();
    const event = makeEventEntity({ id: eventId, state: EventState.PUBLISHED });

    eventRepository.findOne.mockResolvedValue(event as Event);

    const result = await service.findOneByIdOrSlug(eventId);

    expect(eventRepository.findOne).toHaveBeenCalledWith({
      where: { id: eventId },
      relations: ['patrimonios'],
    });
    expect(result).toBeDefined();
  });

  it('should find event by slug', async () => {
    const slug = 'evento-teste';
    const event = makeEventEntity({ slug, state: EventState.PUBLISHED });

    eventRepository.findOne.mockResolvedValue(event as Event);

    const result = await service.findOneByIdOrSlug(slug);

    expect(eventRepository.findOne).toHaveBeenCalledWith({
      where: { slug },
      relations: ['patrimonios'],
    });
    expect(result).toBeDefined();
  });

  it('should throw NotFoundException when event not found', async () => {
    eventRepository.findOne.mockResolvedValue(null);

    await expect(
      service.findOneByIdOrSlug('non-existent-id'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should allow access to published events without requester', async () => {
    const event = makeEventEntity({ state: EventState.PUBLISHED });
    eventRepository.findOne.mockResolvedValue(event as Event);

    const result = await service.findOneByIdOrSlug(event.id!);

    expect(result).toBeDefined();
  });

  it('should allow creator to access draft events', async () => {
    const userId = randomUUID();
    const event = makeEventEntity({
      createdBy: userId,
      state: EventState.DRAFT,
    });
    eventRepository.findOne.mockResolvedValue(event as Event);

    const result = await service.findOneByIdOrSlug(event.id!, {
      userId,
      isAdmin: false,
    });

    expect(result).toBeDefined();
  });

  it('should allow admin to access draft events', async () => {
    const userId = randomUUID();
    const adminId = randomUUID();
    const event = makeEventEntity({
      createdBy: userId,
      state: EventState.DRAFT,
    });
    eventRepository.findOne.mockResolvedValue(event as Event);

    const result = await service.findOneByIdOrSlug(event.id!, {
      userId: adminId,
      isAdmin: true,
    });

    expect(result).toBeDefined();
  });

  it('should throw ForbiddenException when non-creator tries to access draft event', async () => {
    const userId = randomUUID();
    const otherUserId = randomUUID();
    const event = makeEventEntity({
      createdBy: userId,
      state: EventState.DRAFT,
    });
    eventRepository.findOne.mockResolvedValue(event as Event);

    await expect(
      service.findOneByIdOrSlug(event.id!, {
        userId: otherUserId,
        isAdmin: false,
      }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when no requester tries to access draft event', async () => {
    const event = makeEventEntity({ state: EventState.DRAFT });
    eventRepository.findOne.mockResolvedValue(event as Event);

    await expect(service.findOneByIdOrSlug(event.id!)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
