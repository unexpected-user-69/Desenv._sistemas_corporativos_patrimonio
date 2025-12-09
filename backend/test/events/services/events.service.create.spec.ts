import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Event } from '../../../src/events/entities/event.entity';
import { EventPatrimonio } from '../../../src/events/entities/event-patrimonio.entity';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { EventsService } from '../../../src/events/events.service';
import { makeCreateEventDto, makeEventEntity } from '../../factories/event.factory';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { EventState } from '../../../src/events/enums/event-state.enum';
import { EventVisibility } from '../../../src/events/enums/event-visibility.enum';
import { randomUUID } from 'crypto';

describe('EventsService.create (unit)', () => {
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

  it('should create an event successfully', async () => {
    const dto = makeCreateEventDto();
    const createdBy = randomUUID();
    const eventEntity = makeEventEntity({
      ...dto,
      createdBy,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    });

    eventRepository.findOne.mockResolvedValue(null); // Slug não existe
    eventRepository.create.mockReturnValue(eventEntity as Event);
    eventRepository.save.mockResolvedValue(eventEntity as Event);
    eventRepository.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(eventEntity as Event);

    const result = await service.create(dto, createdBy);

    expect(eventRepository.create).toHaveBeenCalled();
    expect(eventRepository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      title: dto.title,
      description: dto.description,
      eventType: dto.eventType,
      visibility: dto.visibility ?? EventVisibility.PUBLIC,
      state: dto.state ?? EventState.DRAFT,
    });
  });

  it('should create an event with patrimonios', async () => {
    const patrimonio1 = makePatrimonioEntity({ id: randomUUID() });
    const patrimonio2 = makePatrimonioEntity({ id: randomUUID() });
    const patrimonioIds = [patrimonio1.id!, patrimonio2.id!];

    const dto = makeCreateEventDto({ patrimonioIds });
    const createdBy = randomUUID();
    const eventEntity = makeEventEntity({
      ...dto,
      createdBy,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      patrimonios: [patrimonio1, patrimonio2] as Patrimonio[],
    });

    eventRepository.findOne.mockResolvedValue(null); // Slug não existe
    patrimonioRepository.find.mockResolvedValue([
      patrimonio1,
      patrimonio2,
    ] as Patrimonio[]);
    eventRepository.create.mockReturnValue(eventEntity as Event);
    eventRepository.save.mockResolvedValue(eventEntity as Event);
    eventPatrimonioRepository.create.mockImplementation((entity) => entity as EventPatrimonio);
    eventPatrimonioRepository.save.mockResolvedValue([]);
    eventRepository.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(eventEntity as Event);

    const result = await service.create(dto, createdBy);

    expect(patrimonioRepository.find).toHaveBeenCalledWith({
      where: { id: In(patrimonioIds) },
      select: ['id'],
    });
    expect(eventPatrimonioRepository.create).toHaveBeenCalledTimes(2);
    expect(eventPatrimonioRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('should throw BadRequestException when endDate is before startDate', async () => {
    const startDate = new Date('2025-02-01T10:00:00Z');
    const endDate = new Date('2025-02-01T08:00:00Z'); // Antes do startDate

    const dto = makeCreateEventDto({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    const createdBy = randomUUID();

    await expect(service.create(dto, createdBy)).rejects.toThrow(
      BadRequestException,
    );
    expect(eventRepository.create).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when patrimonioIds are invalid', async () => {
    const invalidPatrimonioId = randomUUID();
    const dto = makeCreateEventDto({ patrimonioIds: [invalidPatrimonioId] });
    const createdBy = randomUUID();

    eventRepository.findOne.mockResolvedValue(null);
    patrimonioRepository.find.mockResolvedValue([]); // Nenhum patrimônio encontrado

    await expect(service.create(dto, createdBy)).rejects.toThrow(
      BadRequestException,
    );
    expect(eventRepository.create).not.toHaveBeenCalled();
  });

  it('should generate unique slug when slug already exists', async () => {
    const dto = makeCreateEventDto({ title: 'Evento Teste' });
    const createdBy = randomUUID();
    const existingSlug = makeEventEntity({ slug: 'evento-teste' });
    const newSlug = makeEventEntity({ slug: 'evento-teste-1' });
    const savedEvent = makeEventEntity({
      title: dto.title,
      description: dto.description,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      eventType: dto.eventType,
      visibility: dto.visibility,
      state: dto.state,
      createdBy,
    });

    eventRepository.findOne
      .mockResolvedValueOnce(existingSlug as Event) // Slug existe
      .mockResolvedValueOnce(null) // Slug-1 não existe
      .mockResolvedValueOnce(savedEvent as Event); // Retorno final

    eventRepository.create.mockReturnValue(savedEvent as Event);
    eventRepository.save.mockResolvedValue(savedEvent as Event);

    await service.create(dto, createdBy);

    expect(eventRepository.findOne).toHaveBeenCalledTimes(3);
    expect(eventRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'evento-teste-1',
      }),
    );
  });
});
