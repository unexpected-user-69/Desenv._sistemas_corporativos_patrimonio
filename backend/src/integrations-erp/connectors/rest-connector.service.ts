import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  RestConnectorConfig,
  ConnectorResponse,
  IConnector,
} from './rest-connector.interface';

@Injectable()
export class RestConnectorService implements IConnector {
  private readonly logger = new Logger(RestConnectorService.name);
  private axiosInstance: AxiosInstance;
  private config: RestConnectorConfig;
  private accessToken?: string;
  private tokenExpiresAt?: Date;

  constructor(config: RestConnectorConfig) {
    this.config = {
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      ...config,
    };
    this.initializeAxios();
  }

  private initializeAxios(): void {
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para autenticação
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (this.config.authType === 'oauth2') {
        await this.ensureOAuth2Token();
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
      } else if (this.config.authType === 'basic') {
        const { username, password } = this.config.authConfig;
        if (username && password) {
          const credentials = Buffer.from(`${username}:${password}`).toString(
            'base64',
          );
          config.headers.Authorization = `Basic ${credentials}`;
        }
      }
      return config;
    });

    // Interceptor para retries
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;
        if (!config || !config.retry) {
          config.retry = 0;
        }

        if (
          config.retry < (this.config.retries || 3) &&
          this.shouldRetry(error)
        ) {
          config.retry += 1;
          await this.delay(this.config.retryDelay || 1000);
          return this.axiosInstance(config);
        }

        return Promise.reject(error);
      },
    );
  }

  private async ensureOAuth2Token(): Promise<void> {
    if (
      this.accessToken &&
      this.tokenExpiresAt &&
      this.tokenExpiresAt > new Date()
    ) {
      return;
    }

    try {
      const { clientId, clientSecret, tokenUrl, scope } =
        this.config.authConfig;
      if (!tokenUrl || !clientId || !clientSecret) {
        throw new Error('OAuth2 configuration incomplete');
      }

      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          ...(scope && { scope }),
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.accessToken = response.data.access_token;
      const expiresIn = response.data.expires_in || 3600;
      this.tokenExpiresAt = new Date(
        Date.now() + (expiresIn - 60) * 1000, // 60s de margem
      );
    } catch (error: any) {
      this.logger.error('Failed to obtain OAuth2 token', error.message);
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    if (!error.response) {
      return true; // Network error
    }
    const status = error.response.status;
    return status >= 500 || status === 429; // Server error or rate limit
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetch<T = any>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ConnectorResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: (options?.method as any) || 'GET',
        url: endpoint,
        ...(options?.body && { data: JSON.parse(options.body as string) }),
        ...(options?.headers && {
          headers: options.headers as Record<string, string>,
        }),
      };

      const response = await this.axiosInstance.request<T>(axiosConfig);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error: any) {
      this.logger.error(`Error fetching ${endpoint}`, error.message);
      throw error;
    }
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
  ): Promise<ConnectorResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
  ): Promise<ConnectorResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T = any>(endpoint: string): Promise<ConnectorResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

