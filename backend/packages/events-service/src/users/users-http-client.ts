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
}

@Injectable()
export class UsersHttpClient {
  private readonly logger = new Logger(UsersHttpClient.name);
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.timeout = this.configService.get<number>('USERS_API_TIMEOUT') ?? 5000;
    const initialBaseUrl = this.baseUrl;
    this.logger.log(`UsersHttpClient inicializado com baseUrl: ${initialBaseUrl}`);
  }

  private get baseUrl(): string {
    if (process.env.USERS_API_URL) {
      return process.env.USERS_API_URL;
    }
    const configUrl = this.configService.get<string>('USERS_API_URL');
    if (configUrl) {
      return configUrl;
    }
    return 'http://users-service:3002';
  }

  async getUserById(userId: string): Promise<UserInfo | null> {
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
}

