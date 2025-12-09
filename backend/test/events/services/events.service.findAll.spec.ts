import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Event } from '../../../src/events/entities/event.entity';
import { EventPatrimonio } from '../../../src/events/entities/event-patrimonio.entity';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { EventsService } from '../../../src/events/events.service';
import { PatrimonioHttpClient } from '../../../src/http-clients/patrimonio-http-client';
import { makeEventEntity } from '../../factories/event.factory';
import { QueryEventsDto } from '../../../src/events/dto/query-events.dto';
import { EventType } from '../../../src/events/enums/event-type.enum';
import { EventState } from '../../../src/events/enums/event-state.enum';
import { EventVisibility } from '../../../src/events/enums/event-visibility.enum';

describe('EventsService.findAll (unit)', () => {
  let service: EventsService;
  let eventRepository: MockType<Repository<Event>>;
  let mockQueryBuilder: Partial<SelectQueryBuilder<Event>>;

  beforeEach(async () => {
    mockQueryBuilder = {
      leftJoin: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useFactory: () => ({
            ...repositoryMockFactory<Event>(),
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
          }),
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

  it('should return paginated events', async () => {
    const events = [
      makeEventEntity({ title: 'Evento 1' }),
      makeEventEntity({ title: 'Evento 2' }),
    ];
    const total = 2;

    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      total,
    ]);

    const query: QueryEventsDto = { page: 1, limit: 20 };
    const result = await service.findAll(query);

    expect(result).toMatchObject({
      total: 2,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
    expect(result.data).toHaveLength(2);
  });

  it('should apply text search filter', async () => {
    const events = [makeEventEntity({ title: 'Manutenção' })];
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      1,
    ]);

    const query: QueryEventsDto = { q: 'manutenção', page: 1, limit: 20 };
    await service.findAll(query);

    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      '(event.title ILIKE :q OR event.description ILIKE :q)',
      { q: '%manutenção%' },
    );
  });

  it('should apply eventType filter', async () => {
    const events = [makeEventEntity({ eventType: EventType.MANUTENCAO })];
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      1,
    ]);

    const query: QueryEventsDto = {
      eventType: EventType.MANUTENCAO,
      page: 1,
      limit: 20,
    };
    await service.findAll(query);

    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      'event.eventType = :eventType',
      { eventType: EventType.MANUTENCAO },
    );
  });

  it('should apply state filter', async () => {
    const events = [makeEventEntity({ state: EventState.PUBLISHED })];
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      1,
    ]);

    const query: QueryEventsDto = {
      state: EventState.PUBLISHED,
      page: 1,
      limit: 20,
    };
    await service.findAll(query);

    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      'event.state = :state',
      { state: EventState.PUBLISHED },
    );
  });

  it('should apply visibility filter', async () => {
    const events = [makeEventEntity({ visibility: EventVisibility.PUBLIC })];
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      1,
    ]);

    const query: QueryEventsDto = {
      visibility: EventVisibility.PUBLIC,
      page: 1,
      limit: 20,
    };
    await service.findAll(query);

    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      'event.visibility = :visibility',
      { visibility: EventVisibility.PUBLIC },
    );
  });

  it('should apply date filters', async () => {
    const events = [makeEventEntity()];
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      1,
    ]);

    const query: QueryEventsDto = {
      from: '2025-02-01T00:00:00Z',
      to: '2025-02-28T23:59:59Z',
      page: 1,
      limit: 20,
    };
    await service.findAll(query);

    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      'event.startDate >= :from',
      { from: new Date('2025-02-01T00:00:00Z') },
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      '(event.endDate IS NULL OR event.endDate <= :to)',
      { to: new Date('2025-02-28T23:59:59Z') },
    );
  });

  it('should apply pagination correctly', async () => {
    const events = Array.from({ length: 10 }, () => makeEventEntity());
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      50,
    ]);

    const query: QueryEventsDto = { page: 2, limit: 10 };
    const result = await service.findAll(query);

    expect(mockQueryBuilder.skip).toHaveBeenCalledWith(10);
    expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
    expect(result).toMatchObject({
      page: 2,
      limit: 10,
      total: 50,
      totalPages: 5,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });

  it('should order by startDate DESC', async () => {
    const events = [makeEventEntity()];
    (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValue([
      events,
      1,
    ]);

    const query: QueryEventsDto = { page: 1, limit: 20 };
    await service.findAll(query);

    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
      'event.startDate',
      'DESC',
    );
  });
});
