import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface UserStatsByRole {
  [key: string]: number;
}

@Injectable()
export class UsersHttpClient {
  private readonly logger = new Logger(UsersHttpClient.name);
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.timeout = this.configService.get<number>('USERS_SERVICE_TIMEOUT') ?? 5000;
    const baseUrl = this.baseUrl;
    this.logger.log(`UsersHttpClient inicializado com baseUrl: ${baseUrl}`);
  }

  private get baseUrl(): string {
    if (process.env.USERS_SERVICE_URL) {
      return process.env.USERS_SERVICE_URL;
    }
    const configUrl = this.configService.get<string>('USERS_SERVICE_URL');
    if (configUrl) {
      return configUrl;
    }
    return 'http://localhost:3002'; // Default para desenvolvimento local
  }

  /**
   * Busca um usuário por ID
   */
  async findOne(userId: string): Promise<UserInfo | null> {
    const url = `${this.baseUrl}/users/${userId}`;
    this.logger.debug(`Buscando usuário: ${userId}, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserInfo>(
          url,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      this.logger.debug(`Usuário encontrado: ${userId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          this.logger.debug(`Usuário não encontrado: ${userId}`);
          return null;
        }
        this.logger.warn(
          `Erro ao buscar usuário: ${error.message} (status: ${error.response?.status}, URL: ${url})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao buscar usuário: ${error}, URL: ${url}`,
        );
      }
      return null;
    }
  }

  /**
   * Obtém estatísticas de usuários por role
   */
  async getUserStatsByRole(): Promise<UserStatsByRole> {
    const url = `${this.baseUrl}/users/stats/roles`;
    this.logger.debug(`Buscando estatísticas por role, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserStatsByRole>(
          url,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.warn(
        `Erro ao buscar estatísticas por role: ${error instanceof AxiosError ? error.message : error}, URL: ${url}`,
      );
      return {};
    }
  }

  /**
   * Busca usuários ativos recentes
   */
  async findRecentActiveUsers(days: number, limit: number): Promise<UserInfo[]> {
    const url = `${this.baseUrl}/users/recent/active`;
    this.logger.debug(`Buscando usuários ativos recentes, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserInfo[]>(
          url,
          {
            timeout: this.timeout,
            params: {
              days,
              limit,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data || [];
    } catch (error) {
      this.logger.warn(
        `Erro ao buscar usuários ativos recentes: ${error instanceof AxiosError ? error.message : error}, URL: ${url}`,
      );
      return [];
    }
  }
}


