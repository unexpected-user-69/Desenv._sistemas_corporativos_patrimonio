import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between, FindOptionsWhere, In } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Event } from './entities/event.entity';
import { EventPatrimonio } from './entities/event-patrimonio.entity';
// Patrimonio entity - mantida por enquanto pois compartilhamos o banco
// No futuro, quando Patrimonio Service for criado, usar HTTP client
import { Patrimonio } from './entities/patrimonio.entity';
import { EventState } from './enums/event-state.enum';
import { EventVisibility } from './enums/event-visibility.enum';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { PaginatedEventsResponseDto } from './dto/paginated-events-response.dto';
import { toSlug } from './utils/slug.util';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventPatrimonio)
    private readonly eventPatrimonioRepository: Repository<EventPatrimonio>,
    @InjectRepository(Patrimonio)
    private readonly patrimonioRepository: Repository<Patrimonio>,
  ) {}

  /**
   * Serializa Event para EventResponseDto usando class-transformer
   */
  private serializeEvent(event: Event): EventResponseDto {
    try {
      return plainToInstance(EventResponseDto, event, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error('Erro ao serializar evento', {
        error: error?.message,
        stack: error?.stack,
      });
      throw error;
    }
  }

  /**
   * Gera um slug único garantindo que não existe no banco
   */
  private async ensureUniqueSlug(
    baseSlug: string,
    excludeId?: string,
  ): Promise<string> {
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await this.eventRepository.findOne({
        where: { slug },
        select: ['id'],
      });
      if (!existing || existing.id === excludeId) {
        break;
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  /**
   * Cria um novo evento
   */
  async create(
    createEventDto: CreateEventDto,
    createdBy: string,
  ): Promise<EventResponseDto> {
    // Validar datas
    const startDate = new Date(createEventDto.startDate);
    const endDate = createEventDto.endDate
      ? new Date(createEventDto.endDate)
      : null;

    if (endDate && endDate <= startDate) {
      throw new BadRequestException(
        'A data de término deve ser posterior à data de início',
      );
    }

    // Validar patrimônios se fornecidos
    if (createEventDto.patrimonioIds && createEventDto.patrimonioIds.length > 0) {
      const patrimonios = await this.patrimonioRepository.find({
        where: { id: In(createEventDto.patrimonioIds) },
        select: ['id'],
      });

      if (patrimonios.length !== createEventDto.patrimonioIds.length) {
        throw new BadRequestException(
          'Um ou mais patrimônios fornecidos não foram encontrados',
        );
      }
    }

    // Gerar slug único
    const baseSlug = toSlug(createEventDto.title);
    const slug = await this.ensureUniqueSlug(baseSlug);

    // Criar evento
    const event = this.eventRepository.create({
      title: createEventDto.title,
      description: createEventDto.description,
      slug,
      startDate,
      endDate: endDate || undefined,
      eventType: createEventDto.eventType,
      visibility: createEventDto.visibility || EventVisibility.PUBLIC,
      state: createEventDto.state || EventState.DRAFT,
      createdBy,
    });

    const savedEvent = await this.eventRepository.save(event);

    // Criar relações com patrimônios se fornecidos
    if (createEventDto.patrimonioIds && createEventDto.patrimonioIds.length > 0) {
      const eventPatrimonios = createEventDto.patrimonioIds.map((patrimonioId) =>
        this.eventPatrimonioRepository.create({
          eventId: savedEvent.id,
          patrimonioId,
        }),
      );
      await this.eventPatrimonioRepository.save(eventPatrimonios);
    }

    // Buscar evento com relações para retornar
    // Nota: Tentamos carregar com patrimônios, mas se houver erro com categoria_id,
    // carregamos sem patrimônios (algumas tabelas usam categoria varchar em vez de categoria_id uuid)
    let eventWithRelations: Event | null;
    try {
      eventWithRelations = await this.eventRepository.findOne({
        where: { id: savedEvent.id },
        relations: ['patrimonios'],
      });
    } catch (error: any) {
      // Se falhar devido a categoria_id, tentar sem carregar patrimônios
      if (error.message && error.message.includes('categoria_id')) {
        this.logger.warn('Aviso: Não foi possível carregar patrimônios devido a problema com categoria_id. Carregando evento sem patrimônios.');
        eventWithRelations = await this.eventRepository.findOne({
          where: { id: savedEvent.id },
        });
      } else {
        throw error;
      }
    }

    return this.serializeEvent(eventWithRelations!);
  }

  /**
   * Lista eventos com filtros e paginação
   */
  async findAll(query: QueryEventsDto): Promise<PaginatedEventsResponseDto> {
    const {
      page = 1,
      limit = 20,
      q,
      eventType,
      state,
      visibility,
      patrimonioId,
      from,
      to,
    } = query;

    const skip = (page - 1) * limit;

    // Construir query builder
    // Nota: Tentamos carregar patrimônios, mas se houver erro com categoria_id,
    // usamos leftJoin simples (sem select) para permitir filtros sem carregar dados
    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.patrimonios', 'patrimonios');

    // Filtros
    if (q) {
      qb.andWhere(
        '(event.title ILIKE :q OR event.description ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    if (eventType) {
      qb.andWhere('event.eventType = :eventType', { eventType });
    }

    if (state) {
      qb.andWhere('event.state = :state', { state });
    }

    if (visibility) {
      qb.andWhere('event.visibility = :visibility', { visibility });
    }

    if (patrimonioId) {
      qb.andWhere('patrimonios.id = :patrimonioId', { patrimonioId });
    }

    if (from) {
      qb.andWhere('event.startDate >= :from', { from: new Date(from) });
    }

    if (to) {
      qb.andWhere(
        '(event.endDate IS NULL OR event.endDate <= :to)',
        { to: new Date(to) },
      );
    }

    // Ordenação (padrão: startDate DESC)
    qb.orderBy('event.startDate', 'DESC');

    // Paginação
    qb.skip(skip).take(limit);

    // Executar query
    // Nota: Se houver erro ao carregar patrimônios devido a categoria_id,
    // carregamos eventos sem patrimônios
    let events: Event[];
    let total: number;
    
    try {
      [events, total] = await qb.getManyAndCount();
      
      // Tentar carregar patrimônios separadamente para cada evento (se necessário)
      // Mas apenas se não houver erro com categoria_id
      try {
        for (const event of events) {
          if (event.patrimonios && event.patrimonios.length > 0) {
            // Já tem patrimônios carregados, não precisa fazer nada
            continue;
          }
        }
      } catch (error: any) {
        // Se falhar ao carregar patrimônios, simplesmente continuar sem eles
        this.logger.warn('Aviso: Não foi possível carregar patrimônios dos eventos devido a problema com categoria_id');
      }
    } catch (error: any) {
      // Se falhar devido a categoria_id, tentar sem carregar patrimônios
      if (error.message && error.message.includes('categoria_id')) {
        this.logger.warn('Aviso: Não foi possível carregar patrimônios devido a problema com categoria_id. Carregando eventos sem patrimônios.');
        const qbWithoutPatrimonios = this.eventRepository.createQueryBuilder('event');
        
        // Aplicar mesmos filtros
        if (q) {
          qbWithoutPatrimonios.andWhere('(event.title ILIKE :q OR event.description ILIKE :q)', { q: `%${q}%` });
        }
        if (eventType) {
          qbWithoutPatrimonios.andWhere('event.eventType = :eventType', { eventType });
        }
        if (state) {
          qbWithoutPatrimonios.andWhere('event.state = :state', { state });
        }
        if (visibility) {
          qbWithoutPatrimonios.andWhere('event.visibility = :visibility', { visibility });
        }
        if (from) {
          qbWithoutPatrimonios.andWhere('event.startDate >= :from', { from: new Date(from) });
        }
        if (to) {
          qbWithoutPatrimonios.andWhere('(event.endDate IS NULL OR event.endDate <= :to)', { to: new Date(to) });
        }
        
        qbWithoutPatrimonios.orderBy('event.startDate', 'DESC').skip(skip).take(limit);
        [events, total] = await qbWithoutPatrimonios.getManyAndCount();
      } else {
        throw error;
      }
    }

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: events.map((event) => this.serializeEvent(event)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  /**
   * Busca evento por ID ou slug
   */
  async findOneByIdOrSlug(
    idOrSlug: string,
    requester?: { userId: string; isAdmin: boolean },
  ): Promise<EventResponseDto> {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      idOrSlug,
    );

    const event = await this.eventRepository.findOne({
      where: isUUID ? { id: idOrSlug } : { slug: idOrSlug },
      relations: ['patrimonios'],
    });

    if (!event) {
      throw new NotFoundException(
        `Evento com ID ou slug "${idOrSlug}" não encontrado`,
      );
    }

    // Verificar visibilidade e permissões
    if (event.state !== EventState.PUBLISHED) {
      if (
        !requester ||
        (requester.userId !== event.createdBy && !requester.isAdmin)
      ) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este evento',
        );
      }
    }

    return this.serializeEvent(event);
  }

  /**
   * Atualiza um evento
   */
  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    requester: { userId: string; isAdmin: boolean },
  ): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['patrimonios'],
    });

    if (!event) {
      throw new NotFoundException(`Evento com ID "${id}" não encontrado`);
    }

    // Verificar permissões
    if (requester.userId !== event.createdBy && !requester.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este evento',
      );
    }

    // Validar datas se fornecidas
    let startDate = event.startDate;
    let endDate = event.endDate;

    if (updateEventDto.startDate) {
      startDate = new Date(updateEventDto.startDate);
    }
    if (updateEventDto.endDate) {
      endDate = new Date(updateEventDto.endDate);
    }

    if (endDate && endDate <= startDate) {
      throw new BadRequestException(
        'A data de término deve ser posterior à data de início',
      );
    }

    // Atualizar slug se título mudou
    let slug = event.slug;
    if (updateEventDto.title && updateEventDto.title !== event.title) {
      const baseSlug = toSlug(updateEventDto.title);
      slug = await this.ensureUniqueSlug(baseSlug, id);
    }

    // Validar patrimônios se fornecidos
    if (updateEventDto.patrimonioIds) {
      const patrimonios = await this.patrimonioRepository.find({
        where: { id: In(updateEventDto.patrimonioIds) },
        select: ['id'],
      });

      if (patrimonios.length !== updateEventDto.patrimonioIds.length) {
        throw new BadRequestException(
          'Um ou mais patrimônios fornecidos não foram encontrados',
        );
      }

      // Remover relações antigas
      await this.eventPatrimonioRepository.delete({ eventId: id });

      // Criar novas relações
      if (updateEventDto.patrimonioIds.length > 0) {
        const eventPatrimonios = updateEventDto.patrimonioIds.map((patrimonioId) =>
          this.eventPatrimonioRepository.create({
            eventId: id,
            patrimonioId,
          }),
        );
        await this.eventPatrimonioRepository.save(eventPatrimonios);
      }
    }

    // Atualizar campos
    Object.assign(event, {
      ...updateEventDto,
      startDate,
      endDate: endDate || undefined,
      slug,
    });

    const updatedEvent = await this.eventRepository.save(event);

    // Buscar evento atualizado com relações
    const eventWithRelations = await this.eventRepository.findOne({
      where: { id: updatedEvent.id },
      relations: ['patrimonios'],
    });

    return this.serializeEvent(eventWithRelations!);
  }

  /**
   * Publica um evento (muda state de DRAFT para PUBLISHED)
   */
  async publish(
    id: string,
    requester: { userId: string; isAdmin: boolean },
  ): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['patrimonios'],
    });

    if (!event) {
      throw new NotFoundException(`Evento com ID "${id}" não encontrado`);
    }

    // Verificar permissões
    if (requester.userId !== event.createdBy && !requester.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para publicar este evento',
      );
    }

    // Validar transição de estado
    if (event.state !== EventState.DRAFT) {
      throw new BadRequestException(
        'Apenas eventos em rascunho podem ser publicados',
      );
    }

    event.state = EventState.PUBLISHED;
    const publishedEvent = await this.eventRepository.save(event);

    // Buscar evento atualizado com relações
    const eventWithRelations = await this.eventRepository.findOne({
      where: { id: publishedEvent.id },
      relations: ['patrimonios'],
    });

    return this.serializeEvent(eventWithRelations!);
  }
}
