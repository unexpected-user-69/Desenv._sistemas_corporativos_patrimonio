export interface RestConnectorConfig {
  baseUrl: string;
  authType: 'basic' | 'oauth2';
  authConfig: {
    username?: string;
    password?: string;
    clientId?: string;
    clientSecret?: string;
    tokenUrl?: string;
    scope?: string;
  };
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ConnectorResponse<T = any> {
  data: T;
  status: number;
  headers?: Record<string, string>;
}

export interface IConnector {
  fetch<T = any>(endpoint: string, options?: RequestInit): Promise<ConnectorResponse<T>>;
  post<T = any>(endpoint: string, data?: any): Promise<ConnectorResponse<T>>;
  put<T = any>(endpoint: string, data?: any): Promise<ConnectorResponse<T>>;
  delete<T = any>(endpoint: string): Promise<ConnectorResponse<T>>;
}

