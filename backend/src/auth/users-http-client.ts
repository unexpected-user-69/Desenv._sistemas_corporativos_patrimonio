import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

/**
 * Interface para identidade do usuário retornada pelo UsersHttpClient.
 * Adaptado para UUID (string) conforme padrão do Patrimônio.
 */
export interface UserIdentity {
  id: string; // UUID
  email: string;
  name: string;
  roles: string[];
}

/**
 * DTO para validação de credenciais via HTTP.
 */
interface ValidateCredentialsDto {
  email: string;
  password: string;
}

/**
 * Resposta do endpoint /users/validate.
 */
interface ValidateUserResponse {
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

/**
 * Resposta do endpoint /users/:id.
 */
interface GetUserResponse {
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

/**
 * Cliente HTTP resiliente para comunicação com o Users Service.
 * 
 * Este cliente encapsula chamadas externas ao Users Service e utiliza
 * blocos try/catch para gerenciar falhas de comunicação internamente,
 * retornando `null` em caso de erro, o que evita que falhas de rede
 * "vazem" para as camadas superiores do Auth Service.
 * 
 * Configuração:
 * - URL base: lê `USERS_API_URL` com fallback para `http://users:3000`
 * - Timeout: 5 segundos por padrão
 * - Retry: não implementado (pode ser adicionado se necessário)
 */
@Injectable()
export class UsersHttpClient {
  private readonly logger = new Logger(UsersHttpClient.name);
  private readonly timeout: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Timeout é lido apenas uma vez no construtor
    this.timeout = this.configService.get<number>('USERS_API_TIMEOUT') ?? 5000;

    // Log da URL inicial (será lida dinamicamente)
    const initialBaseUrl = this.baseUrl;
    this.logger.log(`UsersHttpClient inicializado com baseUrl: ${initialBaseUrl}`);
  }

  /**
   * Getter para baseUrl que lê dinamicamente de process.env.
   * Isso permite que a URL seja atualizada via variável de ambiente
   * sem precisar recriar o módulo (útil para testes E2E).
   * 
   * Prioriza process.env diretamente para permitir atualizações em tempo de execução,
   * depois tenta ConfigService como fallback.
   */
  private get baseUrl(): string {
    // Prioriza process.env diretamente (permite atualizações em tempo de execução para testes)
    if (process.env.USERS_API_URL) {
      return process.env.USERS_API_URL;
    }
    // Fallback para ConfigService (comportamento padrão para produção)
    const configUrl = this.configService.get<string>('USERS_API_URL');
    if (configUrl) {
      return configUrl;
    }
    // Fallback final
    return 'http://users:3000';
  }

  /**
   * Valida credenciais do usuário via POST /users/validate.
   * 
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns UserIdentity | null - Identidade do usuário se credenciais válidas, null caso contrário
   */
  async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserIdentity | null> {
    const baseUrl = this.baseUrl;
    const url = `${baseUrl}/users/validate`;
    
    this.logger.debug(`Validando credenciais para email: ${email}, URL: ${url}`);
    
    try {
      const dto: ValidateCredentialsDto = { email, password };
      const response = await firstValueFrom(
        this.httpService.post<ValidateUserResponse | null>(
          url,
          dto,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      // Se a resposta for null, as credenciais são inválidas
      if (!response.data) {
        this.logger.debug(`Credenciais inválidas para email: ${email} (resposta null)`);
        return null;
      }

      // Converte a resposta para UserIdentity
      this.logger.debug(`Credenciais válidas para email: ${email}, userId: ${response.data.id}`);
      return {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        roles: [response.data.role], // Converte role (string) para array
      };
    } catch (error) {
      // Trata erros de comunicação (rede, timeout, etc.)
      if (error instanceof AxiosError) {
        // Se for 401/404, credenciais inválidas (não é erro de comunicação)
        if (error.response?.status === 401 || error.response?.status === 404) {
          this.logger.debug(
            `Credenciais inválidas para email: ${email} (status: ${error.response?.status})`,
          );
          return null;
        }

        // Log detalhado de erros de comunicação
        this.logger.warn(
          `Erro ao validar credenciais: ${error.message} (status: ${error.response?.status}, URL: ${url}, code: ${error.code})`,
        );
        
        // Log do erro completo em modo debug
        if (error.response) {
          this.logger.debug(`Response data: ${JSON.stringify(error.response.data)}`);
        }
        if (error.request) {
          this.logger.debug(`Request config: ${JSON.stringify(error.config)}`);
        }
      } else {
        this.logger.error(
          `Erro inesperado ao validar credenciais: ${error}, URL: ${url}`,
        );
      }

      // Retorna null em caso de falha (resiliência)
      return null;
    }
  }

  /**
   * Busca dados do usuário por ID via GET /users/:id.
   * 
   * @param userId - ID do usuário (UUID)
   * @returns UserIdentity | null - Identidade do usuário se encontrado, null caso contrário
   */
  async getUserById(userId: string): Promise<UserIdentity | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GetUserResponse>(
          `${this.baseUrl}/users/${userId}`,
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      // Converte a resposta para UserIdentity
      return {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        roles: [response.data.role], // Converte role (string) para array
      };
    } catch (error) {
      // Trata erros de comunicação (rede, timeout, etc.)
      if (error instanceof AxiosError) {
        // Se for 404, usuário não encontrado (não é erro de comunicação)
        if (error.response?.status === 404) {
          this.logger.debug(`Usuário não encontrado: ${userId}`);
          return null;
        }

        // Outros erros HTTP são tratados como falha de comunicação
        this.logger.warn(
          `Erro ao buscar usuário: ${error.message} (status: ${error.response?.status})`,
        );
      } else {
        this.logger.error(
          `Erro inesperado ao buscar usuário: ${error}`,
        );
      }

      // Retorna null em caso de falha (resiliência)
      return null;
    }
  }
}

