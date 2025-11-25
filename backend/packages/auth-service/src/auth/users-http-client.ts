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
 * - URL base: lê `USERS_SERVICE_URL` com fallback para `http://users-service:3002`
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
    this.timeout = this.configService.get<number>('USERS_SERVICE_TIMEOUT') ?? 5000;

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
    if (process.env.USERS_SERVICE_URL) {
      return process.env.USERS_SERVICE_URL;
    }
    // Fallback para ConfigService (comportamento padrão para produção)
    const configUrl = this.configService.get<string>('USERS_SERVICE_URL');
    if (configUrl) {
      return configUrl;
    }
    // Fallback final: usa localhost em desenvolvimento, users-service em Docker
    // Detecta se está em Docker verificando se o hostname users-service é acessível
    // Por padrão, assume desenvolvimento local
    if (process.env.NODE_ENV === 'production' || process.env.DOCKER_ENV === 'true') {
      return 'http://users-service:3002';
    }
    return 'http://localhost:3002'; // Porta do users-service em desenvolvimento local (sem prefixo /api, apenas para Swagger)
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

      // O TransformResponseInterceptor envolve a resposta em { data: ... }
      // response.data = { data: UserResponseDto | null }
      const wrappedData = response.data as any;
      const userData = wrappedData?.data;
      
      // Se a resposta for null, as credenciais são inválidas
      if (!userData || userData === null) {
        this.logger.debug(`Credenciais inválidas para email: ${email} (resposta null)`);
        return null;
      }

      // Log detalhado para debug
      this.logger.debug(`Resposta completa: ${JSON.stringify(userData)}`);
      
      // Converte a resposta para UserIdentity
      const userId = userData.id;
      if (!userId) {
        this.logger.warn(`userId está undefined para email: ${email}. Resposta completa: ${JSON.stringify(wrappedData)}`);
        // Tenta acessar diretamente se não estiver no formato esperado
        if (wrappedData.id) {
          this.logger.debug(`Encontrado id diretamente em response.data: ${wrappedData.id}`);
          return {
            id: wrappedData.id,
            email: wrappedData.email || userData.email,
            name: wrappedData.name || userData.name,
            roles: [wrappedData.role || userData.role],
          };
        }
        return null;
      }
      
      this.logger.debug(`Credenciais válidas para email: ${email}, userId: ${userId}`);
      return {
        id: userId,
        email: userData.email,
        name: userData.name,
        roles: [userData.role], // Converte role (string) para array
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

      // O TransformResponseInterceptor envolve a resposta em { data: ... }
      const userData = (response.data as any)?.data || response.data;

      // Converte a resposta para UserIdentity
      return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        roles: [userData.role], // Converte role (string) para array
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

  /**
   * Cria o usuário de desenvolvimento via POST /users/dev-user.
   * Endpoint público disponível apenas em desenvolvimento.
   * 
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @param name - Nome do usuário
   * @param role - Role do usuário (padrão: ADMIN)
   * @returns UserIdentity | null - Identidade do usuário se criado, null caso contrário
   */
  async createDevUser(
    email: string,
    password: string,
    name: string,
    role: string = 'ADMIN',
  ): Promise<UserIdentity | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<ValidateUserResponse>(
          `${this.baseUrl}/users/dev-user`,
          {
            email,
            password,
            name,
            role,
            isActive: true,
          },
          {
            timeout: this.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      // O TransformResponseInterceptor envolve a resposta em { data: ... }
      const wrappedData = response.data as any;
      const userData = wrappedData?.data || wrappedData;

      // Log para debug
      this.logger.debug(`Resposta createDevUser: ${JSON.stringify(userData)}`);

      if (!userData || !userData.id) {
        this.logger.warn(`Resposta inválida do createDevUser: ${JSON.stringify(wrappedData)}`);
        return null;
      }

      // Converte a resposta para UserIdentity
      return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        roles: [userData.role],
      };
    } catch (error) {
      // Trata erros de comunicação
      if (error instanceof AxiosError) {
        // Se for 409 (Conflict), o endpoint do users-service já trata isso
        // e retorna o usuário atualizado, então não deveríamos chegar aqui
        // Mas se chegarmos, é um erro inesperado
        if (error.response?.status === 409) {
          this.logger.warn(
            `Usuário já existe (409), mas o endpoint deveria ter retornado o usuário. Verifique o endpoint /users/dev-user.`,
          );
        }
        
        this.logger.warn(
          `Erro ao criar usuário de desenvolvimento: ${error.message} (status: ${error.response?.status})`,
        );
        if (error.response?.data) {
          this.logger.debug(`Response data: ${JSON.stringify(error.response.data)}`);
        }
      } else {
        this.logger.error(
          `Erro inesperado ao criar usuário de desenvolvimento: ${error}`,
        );
      }

      // Retorna null em caso de falha (resiliência)
      return null;
    }
  }
}






