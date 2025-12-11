import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface CategoriaInfo {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  icone?: string;
  cor?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class CategoriasHttpClient {
  private readonly logger = new Logger(CategoriasHttpClient.name);
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.timeout = this.configService.get<number>('CATEGORIAS_SERVICE_TIMEOUT') ?? 5000;
    const baseUrl = this.baseUrl;
    this.logger.log(`CategoriasHttpClient inicializado com baseUrl: ${baseUrl}`);
  }

  private get baseUrl(): string {
    if (process.env.CATEGORIAS_SERVICE_URL) {
      return process.env.CATEGORIAS_SERVICE_URL;
    }
    const configUrl = this.configService.get<string>('CATEGORIAS_SERVICE_URL');
    if (configUrl) {
      return configUrl;
    }
    return 'http://localhost:3004'; // Default para desenvolvimento local
  }

  /**
   * Busca uma categoria por ID
   */
  async findOne(categoriaId: string): Promise<CategoriaInfo | null> {
    const url = `${this.baseUrl}/categorias/${categoriaId}`;
    this.logger.debug(`Buscando categoria: ${categoriaId}, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<CategoriaInfo>(
          url,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      this.logger.debug(`Categoria encontrada: ${categoriaId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          this.logger.debug(`Categoria não encontrada: ${categoriaId}`);
          return null;
        }
        this.logger.warn(
          `Erro ao buscar categoria: ${error.message} (status: ${error.response?.status}, URL: ${url})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao buscar categoria: ${error}, URL: ${url}`,
        );
      }
      return null;
    }
  }

  /**
   * Busca uma categoria por código
   */
  async findByCodigo(codigo: string): Promise<CategoriaInfo | null> {
    const url = `${this.baseUrl}/categorias/codigo/${codigo}`;
    this.logger.debug(`Buscando categoria por código: ${codigo}, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<CategoriaInfo>(
          url,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      this.logger.debug(`Categoria encontrada por código: ${codigo}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          this.logger.debug(`Categoria não encontrada por código: ${codigo}`);
          return null;
        }
        this.logger.warn(
          `Erro ao buscar categoria por código: ${error.message} (status: ${error.response?.status}, URL: ${url})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao buscar categoria por código: ${error}, URL: ${url}`,
        );
      }
      return null;
    }
  }

  /**
   * Lista todas as categorias ativas
   */
  async findAll(): Promise<CategoriaInfo[]> {
    const url = `${this.baseUrl}/categorias`;
    this.logger.debug(`Buscando todas as categorias, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ data: CategoriaInfo[] }>(
          url,
          {
            timeout: this.timeout,
            params: {
              ativo: true,
              limit: 1000, // Limite alto para pegar todas
            },
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data.data || [];
    } catch (error) {
      this.logger.warn(
        `Erro ao buscar categorias: ${error instanceof AxiosError ? error.message : error}, URL: ${url}`,
      );
      return [];
    }
  }
}




