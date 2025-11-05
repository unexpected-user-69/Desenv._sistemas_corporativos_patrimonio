import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventsController } from '../../../src/events/events.controller';
import { EventsService } from '../../../src/events/events.service';
import { makeEventEntity } from '../../factories/event.factory';
import { randomUUID } from 'crypto';

describe('EventsController – findOne', () => {
  let controller: EventsController;
  const service = { findOneByIdOrSlug: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: service }],
    }).compile();
    controller = mod.get(EventsController);
    jest.clearAllMocks();
  });

  it('GET /events/:idOrSlug → delega ao service.findOneByIdOrSlug', async () => {
    const idOrSlug = randomUUID();
    const mockEvent = makeEventEntity({ id: idOrSlug });
    service.findOneByIdOrSlug.mockResolvedValue(mockEvent);

    const res = await controller.findOne(idOrSlug);

    expect(service.findOneByIdOrSlug).toHaveBeenCalledWith(idOrSlug, undefined);
    expect(res).toEqual(mockEvent);
  });

  it('should pass requester info when user is authenticated', async () => {
    const idOrSlug = randomUUID();
    const userId = randomUUID();
    const mockEvent = makeEventEntity({ id: idOrSlug });
    const mockReq = {
      user: {
        sub: userId,
        roles: ['student'],
      },
    };

    service.findOneByIdOrSlug.mockResolvedValue(mockEvent);

    const res = await controller.findOne(idOrSlug, mockReq);

    expect(service.findOneByIdOrSlug).toHaveBeenCalledWith(idOrSlug, {
      userId,
      isAdmin: false,
    });
    expect(res).toEqual(mockEvent);
  });

  it('should throw NotFoundException when event not found', async () => {
    const idOrSlug = randomUUID();
    service.findOneByIdOrSlug.mockRejectedValue(
      new NotFoundException(`Evento com ID ou slug "${idOrSlug}" não encontrado`),
    );

    await expect(controller.findOne(idOrSlug)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.findOneByIdOrSlug).toHaveBeenCalledWith(idOrSlug, undefined);
  });
});
