import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface AuthUserInfo {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

@Injectable()
export class AuthHttpClient {
  private readonly logger = new Logger(AuthHttpClient.name);
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.timeout = this.configService.get<number>('AUTH_API_TIMEOUT') ?? 5000;
    const initialBaseUrl = this.baseUrl;
    this.logger.log(`AuthHttpClient inicializado com baseUrl: ${initialBaseUrl}`);
  }

  private get baseUrl(): string {
    if (process.env.AUTH_API_URL) {
      return process.env.AUTH_API_URL;
    }
    const configUrl = this.configService.get<string>('AUTH_API_URL');
    if (configUrl) {
      return configUrl;
    }
    return 'http://auth-service:3001';
  }

  async validateToken(token: string): Promise<AuthUserInfo | null> {
    const url = `${this.baseUrl}/auth/me`;
    this.logger.debug(`Validando token, URL: ${url}`);
    try {
      const response = await firstValueFrom(
        this.httpService.get<AuthUserInfo>(
          url,
          {
            timeout: this.timeout,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      this.logger.debug(`Token válido para userId: ${response.data.id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.logger.debug(`Token inválido (status: ${error.response?.status})`);
          return null;
        }
        this.logger.warn(
          `Erro ao validar token: ${error.message} (status: ${error.response?.status}, URL: ${url})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao validar token: ${error}, URL: ${url}`,
        );
      }
      return null;
    }
  }
}

