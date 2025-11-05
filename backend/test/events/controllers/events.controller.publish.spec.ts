import { Test } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { EventsController } from '../../../src/events/events.controller';
import { EventsService } from '../../../src/events/events.service';
import { makeEventEntity } from '../../factories/event.factory';
import { EventState } from '../../../src/events/enums/event-state.enum';
import { randomUUID } from 'crypto';

describe('EventsController – publish', () => {
  let controller: EventsController;
  const service = { publish: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: service }],
    }).compile();
    controller = mod.get(EventsController);
    jest.clearAllMocks();
  });

  it('POST /events/:id/publish → delega ao service.publish', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const mockEvent = makeEventEntity({
      id: eventId,
      state: EventState.PUBLISHED,
    });
    const mockReq = {
      user: {
        roles: ['teacher'],
      },
    };

    service.publish.mockResolvedValue(mockEvent);

    const res = await controller.publish(eventId, userId, mockReq);

    expect(service.publish).toHaveBeenCalledWith(eventId, {
      userId,
      isAdmin: false,
    });
    expect(res).toEqual(mockEvent);
  });

  it('should pass isAdmin true when user is admin', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const mockEvent = makeEventEntity({
      id: eventId,
      state: EventState.PUBLISHED,
    });
    const mockReq = {
      user: {
        roles: ['admin'],
      },
    };

    service.publish.mockResolvedValue(mockEvent);

    await controller.publish(eventId, userId, mockReq);

    expect(service.publish).toHaveBeenCalledWith(eventId, {
      userId,
      isAdmin: true,
    });
  });

  it('should throw NotFoundException when event not found', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const mockReq = {
      user: {
        roles: ['teacher'],
      },
    };

    service.publish.mockRejectedValue(
      new NotFoundException(`Evento com ID "${eventId}" não encontrado`),
    );

    await expect(controller.publish(eventId, userId, mockReq)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException when event is not DRAFT', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const mockReq = {
      user: {
        roles: ['teacher'],
      },
    };

    service.publish.mockRejectedValue(
      new BadRequestException('Apenas eventos em rascunho podem ser publicados'),
    );

    await expect(controller.publish(eventId, userId, mockReq)).rejects.toThrow(
      BadRequestException,
    );
  });
});
