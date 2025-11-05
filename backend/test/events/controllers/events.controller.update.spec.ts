import { Test } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { EventsController } from '../../../src/events/events.controller';
import { EventsService } from '../../../src/events/events.service';
import { makeEventEntity } from '../../factories/event.factory';
import { UpdateEventDto } from '../../../src/events/dto/update-event.dto';
import { randomUUID } from 'crypto';

describe('EventsController – update', () => {
  let controller: EventsController;
  const service = { update: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: service }],
    }).compile();
    controller = mod.get(EventsController);
    jest.clearAllMocks();
  });

  it('PATCH /events/:id → delega ao service.update', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const updateDto: UpdateEventDto = { title: 'Título Atualizado' };
    const mockEvent = makeEventEntity({ id: eventId, title: 'Título Atualizado' });
    const mockReq = {
      user: {
        roles: ['teacher'],
      },
    };

    service.update.mockResolvedValue(mockEvent);

    const res = await controller.update(eventId, updateDto, userId, mockReq);

    expect(service.update).toHaveBeenCalledWith(eventId, updateDto, {
      userId,
      isAdmin: false,
    });
    expect(res).toEqual(mockEvent);
  });

  it('should pass isAdmin true when user is admin', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const updateDto: UpdateEventDto = { title: 'Título Atualizado' };
    const mockEvent = makeEventEntity({ id: eventId });
    const mockReq = {
      user: {
        roles: ['admin'],
      },
    };

    service.update.mockResolvedValue(mockEvent);

    await controller.update(eventId, updateDto, userId, mockReq);

    expect(service.update).toHaveBeenCalledWith(eventId, updateDto, {
      userId,
      isAdmin: true,
    });
  });

  it('should throw NotFoundException when event not found', async () => {
    const eventId = randomUUID();
    const userId = randomUUID();
    const updateDto: UpdateEventDto = {};
    const mockReq = {
      user: {
        roles: ['teacher'],
      },
    };

    service.update.mockRejectedValue(
      new NotFoundException(`Evento com ID "${eventId}" não encontrado`),
    );

    await expect(
      controller.update(eventId, updateDto, userId, mockReq),
    ).rejects.toThrow(NotFoundException);
  });
});
