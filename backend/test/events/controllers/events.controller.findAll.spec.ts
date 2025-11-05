import { Test } from '@nestjs/testing';
import { EventsController } from '../../../src/events/events.controller';
import { EventsService } from '../../../src/events/events.service';
import { QueryEventsDto } from '../../../src/events/dto/query-events.dto';

describe('EventsController – findAll', () => {
  let controller: EventsController;
  const service = { findAll: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: service }],
    }).compile();
    controller = mod.get(EventsController);
    jest.clearAllMocks();
  });

  it('GET /events → delega ao service.findAll', async () => {
    const query: QueryEventsDto = { page: 1, limit: 20 };
    const mockResponse = {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    service.findAll.mockResolvedValue(mockResponse);

    const res = await controller.findAll(query);

    expect(service.findAll).toHaveBeenCalledWith(query);
    expect(res).toEqual(mockResponse);
  });
});
