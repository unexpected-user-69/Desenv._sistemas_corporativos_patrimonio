import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { DataSource } from 'typeorm';
import { HashService } from '../common/services/hash.service';

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
  private dataSource?: DataSource;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
  ) {
    // Timeout é lido apenas uma vez no construtor
    this.timeout = this.configService.get<number>('USERS_SERVICE_TIMEOUT') ?? 5000;

    // Log da URL inicial (será lida dinamicamente)
    const initialBaseUrl = this.baseUrl;
    this.logger.log(`🚀 UsersHttpClient inicializado com baseUrl: ${initialBaseUrl}`);
    this.logger.log(`⏱️  Timeout configurado: ${this.timeout}ms`);
  }

  /**
   * Define o DataSource para validação direta no banco (usado em testes)
   */
  setDataSource(dataSource: DataSource): void {
    this.dataSource = dataSource;
    this.logger.log(`✅ DataSource configurado para validação direta. NODE_ENV: ${process.env.NODE_ENV}, DEV_AUTO_AUTH: ${process.env.DEV_AUTO_AUTH}`);
  }

  /**
   * Verifica se deve usar validação direta no banco (modo de teste)
   */
  private shouldUseDirectValidation(): boolean {
    return (
      process.env.NODE_ENV === 'test' ||
      process.env.DEV_AUTO_AUTH === 'true' ||
      !!this.dataSource
    );
  }

  /**
   * Valida credenciais diretamente no banco de dados (modo de teste)
   */
  private async validateCredentialsDirect(
    email: string,
    password: string,
  ): Promise<UserIdentity | null> {
    if (!this.dataSource) {
      this.logger.warn('DataSource não configurado para validação direta');
      return null;
    }

    try {
      // Tenta primeiro no schema users (microserviços), depois no schema padrão
      let result = await this.dataSource.query(
        `SELECT id, email, password_hash, name, role, is_active 
         FROM users.users 
         WHERE email = $1 AND deleted_at IS NULL`,
        [email.toLowerCase()],
      );
      
      // Se não encontrou no schema users, tenta no schema padrão
      if (result.length === 0) {
        result = await this.dataSource.query(
          `SELECT id, email, password_hash, name, role, is_active 
           FROM users 
           WHERE email = $1 AND deleted_at IS NULL`,
          [email.toLowerCase()],
        );
      }

      if (result.length === 0) {
        return null;
      }

      const user = result[0];
      if (!user.is_active) {
        return null;
      }

      // Verifica a senha usando HashService (que adiciona o pepper corretamente)
      this.logger.debug(`🔑 Comparando senha para usuário ${user.email}`);
      this.logger.debug(`   Hash no banco (primeiros 30 chars): ${user.password_hash.substring(0, 30)}...`);
      this.logger.debug(`   Pepper configurado: ${process.env.HASH_PEPPER ? process.env.HASH_PEPPER.substring(0, 10) + '...' : '(vazio)'}`);
      this.logger.debug(`   Salt rounds: ${process.env.HASH_SALT_ROUNDS || '12'}`);
      const isValid = await this.hashService.compare(password, user.password_hash);
      this.logger.debug(`🔑 Resultado da comparação: ${isValid}`);
      if (!isValid) {
        this.logger.warn(`❌ Senha inválida para usuário ${user.email}`);
        this.logger.warn(`   Verifique se o HASH_PEPPER está configurado corretamente no .env`);
        return null;
      }
      this.logger.log(`✅ Credenciais válidas para usuário ${user.email}`);

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [user.role],
      };
    } catch (error) {
      this.logger.error(`Erro ao validar credenciais diretamente: ${error}`);
      return null;
    }
  }

  /**
   * Cria usuário de desenvolvimento diretamente no banco (modo de validação direta)
   */
  private async createDevUserDirect(
    email: string,
    password: string,
    name: string,
    role: string = 'ADMIN',
  ): Promise<UserIdentity | null> {
    if (!this.dataSource) {
      this.logger.warn('DataSource não configurado para criação direta');
      return null;
    }

    try {
      // Determinar qual tabela usar (tenta users.users primeiro, depois users)
      let tableName = 'users.users';
      try {
        const schemaCheck = await this.dataSource.query(
          `SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'users'`
        );
        tableName = schemaCheck.length > 0 ? 'users.users' : 'users';
      } catch {
        tableName = 'users';
      }

      // Verifica se o usuário já existe
      let result = await this.dataSource.query(
        `SELECT id, email, name, role, is_active FROM ${tableName} WHERE email = $1`,
        [email.toLowerCase()],
      );
      
      // Se não encontrou, tenta no outro schema
      if (result.length === 0) {
        const altTableName = tableName === 'users.users' ? 'users' : 'users.users';
        try {
          result = await this.dataSource.query(
            `SELECT id, email, name, role, is_active FROM ${altTableName} WHERE email = $1`,
            [email.toLowerCase()],
          );
          if (result.length > 0) {
            tableName = altTableName; // Usa a tabela onde encontrou
          }
        } catch {
          // Ignora erro se a tabela não existir
        }
      }

      // Hash da senha usando HashService
      const passwordHash = await this.hashService.hash(password);

      if (result.length > 0) {
        // Usuário já existe, atualiza senha e informações
        this.logger.log(`⚠️  Usuário ${email} já existe. Atualizando...`);
        await this.dataSource.query(
          `UPDATE ${tableName} 
           SET password_hash = $1, 
               name = $2, 
               role = $3,
               is_active = true,
               deleted_at = NULL,
               updated_at = NOW()
           WHERE email = $4`,
          [passwordHash, name, role, email.toLowerCase()],
        );
      } else {
        // Criar novo usuário
        this.logger.log(`📝 Criando usuário ${email}...`);
        await this.dataSource.query(
          `INSERT INTO ${tableName} (id, name, email, password_hash, role, is_active, created_at, updated_at, version)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW(), 1)`,
          [name, email.toLowerCase(), passwordHash, role],
        );
      }

      // Buscar o usuário criado/atualizado
      let userResult = await this.dataSource.query(
        `SELECT id, email, name, role, is_active FROM ${tableName} WHERE email = $1`,
        [email.toLowerCase()],
      );

      if (userResult.length === 0) {
        // Se não encontrou, tenta no outro schema
        const altTableName = tableName === 'users.users' ? 'users' : 'users.users';
        try {
          userResult = await this.dataSource.query(
            `SELECT id, email, name, role, is_active FROM ${altTableName} WHERE email = $1`,
            [email.toLowerCase()],
          );
        } catch {
          // Ignora erro se a tabela não existir
        }
      }

      if (userResult.length === 0) {
        this.logger.error(`Erro: Usuário não foi encontrado após criação`);
        return null;
      }

      const user = userResult[0];
      this.logger.log(`✅ Usuário ${email} criado/atualizado com sucesso`);

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [user.role],
      };
    } catch (error) {
      this.logger.error(`Erro ao criar usuário diretamente: ${error}`);
      return null;
    }
  }

  /**
   * Busca usuário por ID diretamente no banco (modo de teste)
   */
  private async getUserByIdDirect(userId: string): Promise<UserIdentity | null> {
    if (!this.dataSource) {
      this.logger.warn('DataSource não configurado para busca direta');
      return null;
    }

    try {
      // Tenta primeiro no schema users (microserviços), depois no schema padrão
      let result = await this.dataSource.query(
        `SELECT id, email, name, role, is_active 
         FROM users.users 
         WHERE id = $1 AND deleted_at IS NULL`,
        [userId],
      );
      
      // Se não encontrou no schema users, tenta no schema padrão
      if (result.length === 0) {
        result = await this.dataSource.query(
          `SELECT id, email, name, role, is_active 
           FROM users 
           WHERE id = $1 AND deleted_at IS NULL`,
          [userId],
        );
      }

      if (result.length === 0 || !result[0].is_active) {
        return null;
      }

      const user = result[0];
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [user.role],
      };
    } catch (error) {
      this.logger.error(`Erro ao buscar usuário diretamente: ${error}`);
      return null;
    }
  }

  /**
   * Helper para obter headers com SERVICE_TOKEN para autenticação service-to-service
   */
  private getServiceHeaders(): Record<string, string> {
    const serviceToken = process.env.SERVICE_TOKEN || process.env.SERVICE_TOKEN_CURRENT;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (serviceToken) {
      headers['x-service-token'] = serviceToken;
    } else {
      this.logger.warn(
        '⚠️ SERVICE_TOKEN não configurado. Requisição service-to-service pode falhar.',
      );
    }
    
    return headers;
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
   * Em modo de teste, valida diretamente no banco de dados.
   * 
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns UserIdentity | null - Identidade do usuário se credenciais válidas, null caso contrário
   */
  async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserIdentity | null> {
    // Em modo de teste, valida diretamente no banco
    const useDirect = this.shouldUseDirectValidation();
    this.logger.log(`🔐 Validando credenciais para email: ${email}`);
    this.logger.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    this.logger.log(`   DEV_AUTO_AUTH: ${process.env.DEV_AUTO_AUTH}`);
    this.logger.log(`   DataSource configurado: ${!!this.dataSource}`);
    this.logger.log(`   Usando validação direta: ${useDirect}`);
    
    if (useDirect) {
      this.logger.log(`   → Usando validação direta no banco de dados`);
      return this.validateCredentialsDirect(email, password);
    }
    
    this.logger.log(`   → Usando validação via HTTP (users-service)`);

    const baseUrl = this.baseUrl;
    const url = `${baseUrl}/users/validate`;
    
      this.logger.log(`🔐 Validando credenciais para email: ${email}, URL: ${url}`);
      
      try {
        const dto: ValidateCredentialsDto = { email, password };
        const response = await firstValueFrom(
          this.httpService.post<ValidateUserResponse | null>(
            url,
            dto,
            {
              timeout: this.timeout,
              headers: this.getServiceHeaders(),
            },
          ),
        );

      // O TransformResponseInterceptor envolve a resposta em { data: ... }
      // response.data = { data: UserResponseDto | null }
      const wrappedData = response.data as any;
      
      // Log detalhado para debug
      this.logger.log(`📦 Resposta bruta do users-service: ${JSON.stringify(wrappedData)}`);
      
      const userData = wrappedData?.data;
      
      // Log adicional
      this.logger.log(`👤 userData extraído: ${JSON.stringify(userData)}`);
      
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
        this.logger.error(
          `❌ ERRO ao validar credenciais: ${error.message} (status: ${error.response?.status}, URL: ${url}, code: ${error.code})`,
        );
        
        // Log do erro completo em modo debug
        if (error.response) {
          this.logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
          this.logger.error(`Response status: ${error.response.status}`);
          this.logger.error(`Response headers: ${JSON.stringify(error.response.headers)}`);
        }
        if (error.request) {
          this.logger.error(`Request was made but no response received`);
          this.logger.error(`Request config: ${JSON.stringify(error.config)}`);
        }
      } else {
        this.logger.error(
          `❌ Erro inesperado ao validar credenciais: ${error}, URL: ${url}`,
        );
        this.logger.error(`Error stack: ${(error as Error).stack}`);
      }

      // Retorna null em caso de falha (resiliência)
      this.logger.error(`🔥 Retornando null devido ao erro acima`);
      return null;
    }
  }

  /**
   * Busca dados do usuário por ID via GET /users/:id.
   * Em modo de teste, busca diretamente no banco de dados.
   * 
   * @param userId - ID do usuário (UUID)
   * @returns UserIdentity | null - Identidade do usuário se encontrado, null caso contrário
   */
  async getUserById(userId: string): Promise<UserIdentity | null> {
    // Em modo de teste, busca diretamente no banco
    if (this.shouldUseDirectValidation()) {
      return this.getUserByIdDirect(userId);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<GetUserResponse>(
          `${this.baseUrl}/users/${userId}`,
          {
            timeout: this.timeout,
            headers: this.getServiceHeaders(),
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
   * Cria o usuário de desenvolvimento via POST /users/dev-user ou diretamente no banco.
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
    // Se está usando validação direta, cria o usuário diretamente no banco
    if (this.shouldUseDirectValidation() && this.dataSource) {
      return this.createDevUserDirect(email, password, name, role);
    }
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






