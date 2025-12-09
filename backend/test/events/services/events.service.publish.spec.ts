import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { PatrimonioHttpClient } from '../../../src/http-clients/patrimonio-http-client';
import { makeEventEntity } from '../../factories/event.factory';
import { EventState } from '../../../src/events/enums/event-state.enum';
import { randomUUID } from 'crypto';

describe('EventsService.publish (unit)', () => {
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
          provide: PatrimonioHttpClient,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(EventsService);
    eventRepository = module.get(getRepositoryToken(Event));
  });

  it('should publish event successfully', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const draftEvent = makeEventEntity({
      id: eventId,
      createdBy: userId,
      state: EventState.DRAFT,
    });
    const publishedEvent = makeEventEntity({
      ...draftEvent,
      state: EventState.PUBLISHED,
    });

    eventRepository.findOne.mockResolvedValueOnce(draftEvent as Event);
    eventRepository.save.mockResolvedValue(publishedEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(publishedEvent as Event);

    const result = await service.publish(eventId, {
      userId,
      isAdmin: false,
    });

    expect(eventRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        state: EventState.PUBLISHED,
      }),
    );
    expect(result).toBeDefined();
  });

  it('should throw NotFoundException when event not found', async () => {
    const eventId = randomUUID();
    eventRepository.findOne.mockResolvedValue(null);

    await expect(
      service.publish(eventId, { userId: randomUUID(), isAdmin: false }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw ForbiddenException when user is not creator or admin', async () => {
    const userId = randomUUID();
    const otherUserId = randomUUID();
    const eventId = randomUUID();
    const event = makeEventEntity({
      id: eventId,
      createdBy: userId,
      state: EventState.DRAFT,
    });

    eventRepository.findOne.mockResolvedValue(event as Event);

    await expect(
      service.publish(eventId, { userId: otherUserId, isAdmin: false }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow admin to publish any event', async () => {
    const userId = randomUUID();
    const adminId = randomUUID();
    const eventId = randomUUID();
    const event = makeEventEntity({
      id: eventId,
      createdBy: userId,
      state: EventState.DRAFT,
    });
    const publishedEvent = makeEventEntity({
      ...event,
      state: EventState.PUBLISHED,
    });

    eventRepository.findOne.mockResolvedValueOnce(event as Event);
    eventRepository.save.mockResolvedValue(publishedEvent as Event);
    eventRepository.findOne.mockResolvedValueOnce(publishedEvent as Event);

    const result = await service.publish(eventId, {
      userId: adminId,
      isAdmin: true,
    });

    expect(result).toBeDefined();
  });

  it('should throw BadRequestException when event is not DRAFT', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const publishedEvent = makeEventEntity({
      id: eventId,
      createdBy: userId,
      state: EventState.PUBLISHED,
    });

    eventRepository.findOne.mockResolvedValue(publishedEvent as Event);

    await expect(
      service.publish(eventId, { userId, isAdmin: false }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException when event is CANCELLED', async () => {
    const userId = randomUUID();
    const eventId = randomUUID();
    const cancelledEvent = makeEventEntity({
      id: eventId,
      createdBy: userId,
      state: EventState.CANCELLED,
    });

    eventRepository.findOne.mockResolvedValue(cancelledEvent as Event);

    await expect(
      service.publish(eventId, { userId, isAdmin: false }),
    ).rejects.toThrow(BadRequestException);
  });
});
