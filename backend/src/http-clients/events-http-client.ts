import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface EventInfo {
  id: string;
  title: string;
  description?: string;
  slug: string;
  startDate: string;
  endDate?: string;
  eventType: string;
  visibility: string;
  state: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface CreateEventDto {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  eventType: string;
  patrimonioIds?: string[];
  visibility?: string;
  state?: string;
}

@Injectable()
export class EventsHttpClient {
  private readonly logger = new Logger(EventsHttpClient.name);
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.timeout = this.configService.get<number>('EVENTS_SERVICE_TIMEOUT') ?? 5000;
    const baseUrl = this.baseUrl;
    this.logger.log(`EventsHttpClient inicializado com baseUrl: ${baseUrl}`);
  }

  private get baseUrl(): string {
    if (process.env.EVENTS_SERVICE_URL) {
      return process.env.EVENTS_SERVICE_URL;
    }
    const configUrl = this.configService.get<string>('EVENTS_SERVICE_URL');
    if (configUrl) {
      return configUrl;
    }
    return 'http://localhost:3003'; // Default para desenvolvimento local
  }

  /**
   * Busca um evento por ID ou slug
   */
  async findOneByIdOrSlug(idOrSlug: string): Promise<EventInfo | null> {
    const url = `${this.baseUrl}/events/${idOrSlug}`;
    this.logger.debug(`Buscando evento: ${idOrSlug}, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<EventInfo>(
          url,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      this.logger.debug(`Evento encontrado: ${idOrSlug}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          this.logger.debug(`Evento não encontrado: ${idOrSlug}`);
          return null;
        }
        this.logger.warn(
          `Erro ao buscar evento: ${error.message} (status: ${error.response?.status}, URL: ${url})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao buscar evento: ${error}, URL: ${url}`,
        );
      }
      return null;
    }
  }

  /**
   * Cria um novo evento
   */
  async create(
    createEventDto: CreateEventDto,
    createdBy: string,
    accessToken?: string,
  ): Promise<EventInfo | null> {
    const url = `${this.baseUrl}/events`;
    this.logger.debug(`Criando evento: ${createEventDto.title}, URL: ${url}`);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await firstValueFrom(
        this.httpService.post<EventInfo>(
          url,
          createEventDto,
          {
            timeout: this.timeout,
            headers,
          },
        ),
      );
      this.logger.debug(`Evento criado: ${response.data.id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.logger.warn(`Não autorizado para criar evento (status: ${error.response?.status})`);
          return null;
        }
        this.logger.warn(
          `Erro ao criar evento: ${error.message} (status: ${error.response?.status}, URL: ${url})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao criar evento: ${error}, URL: ${url}`,
        );
      }
      return null;
    }
  }
}

