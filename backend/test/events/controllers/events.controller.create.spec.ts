import { Test } from '@nestjs/testing';
import { EventsController } from '../../../src/events/events.controller';
import { EventsService } from '../../../src/events/events.service';
import { makeCreateEventDto } from '../../factories/event.factory';
import { makeEventEntity } from '../../factories/event.factory';
import { randomUUID } from 'crypto';

describe('EventsController – create', () => {
  let controller: EventsController;
  const service = { create: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: service }],
    }).compile();
    controller = mod.get(EventsController);
    jest.clearAllMocks();
  });

  it('POST /events → delega ao service.create', async () => {
    const dto = makeCreateEventDto();
    const mockEvent = makeEventEntity({
      title: dto.title,
      description: dto.description,
      eventType: dto.eventType,
      id: randomUUID(),
    });
    const createdBy = randomUUID();

    service.create.mockResolvedValue(mockEvent);

    const res = await controller.create(dto, createdBy);

    expect(service.create).toHaveBeenCalledWith(dto, createdBy);
    expect(res).toEqual(mockEvent);
  });
});
