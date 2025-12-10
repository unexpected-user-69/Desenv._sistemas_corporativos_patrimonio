import { Repository } from 'typeorm';

/**
 * Utilitários para implementação de dobres de teste (Test Doubles)
 * Baseado no PDF 086: Implementações para Testes Unitários
 */

// ============================================================================
// 1. DUMMY - Objetos que não fazem nada, apenas satisfazem interfaces
// ============================================================================

export const createDummyLogger = () => ({
  log: jest.fn(() => {}),
  error: jest.fn(() => {}),
  warn: jest.fn(() => {}),
  debug: jest.fn(() => {}),
});

export const createDummyRepository = <T extends object>(): Partial<
  Repository<T>
> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
  findAndCount: jest.fn(),
});

// ============================================================================
// 2. STUB - Objetos que retornam valores pré-configurados
// ============================================================================

export const createStubUserRepository = () => ({
  findOne: jest.fn().mockResolvedValue(null),
  find: jest.fn().mockResolvedValue([]),
  save: jest.fn().mockResolvedValue({}),
  findAndCount: jest.fn().mockResolvedValue([[], 0]),
  create: jest.fn().mockReturnValue({}),
  remove: jest.fn().mockResolvedValue(undefined),
  softDelete: jest.fn().mockResolvedValue(undefined),
});

export const createStubBcryptService = () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
});

// ============================================================================
// 3. SPY - Objetos que monitoram chamadas e argumentos
// ============================================================================

export const createSpyRepository = <T extends object>(): Partial<
  Repository<T>
> => {
  const spy = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    findAndCount: jest.fn(),
  };

  return spy;
};

export const createSpyLogger = () => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
});

// ============================================================================
// 4. MOCK - Objetos com expectativas rígidas
// ============================================================================

export const createMockUserRepository = () => {
  const mock = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    softDelete: jest.fn(),
    preload: jest.fn(),
  };

  // Configurar expectativas padrão
  mock.findOne.mockResolvedValue(null);
  mock.find.mockResolvedValue([]);
  mock.save.mockResolvedValue({});
  mock.findAndCount.mockResolvedValue([[], 0]);
  mock.create.mockReturnValue({});
  mock.remove.mockResolvedValue(undefined);
  mock.softDelete.mockResolvedValue(undefined);
  mock.preload.mockResolvedValue(null);

  return mock;
};

// ============================================================================
// 5. FAKE - Implementações simplificadas em memória
// ============================================================================

export class FakeUserRepository {
  private users: any[] = [];
  private nextId = 1;

  findOne(options: any): Promise<any> {
    const { where, withDeleted } = options || {};
    if (where?.id) {
      // Garantir comparação consistente convertendo para string
      const searchId = String(where.id);
      const user = this.users.find((user) => {
        const matchesId = String(user.id) === searchId;
        // Se withDeleted for true, incluir soft-deleted users
        // Se withDeleted for false ou undefined, excluir soft-deleted users
        if (withDeleted === true) {
          return matchesId;
        }
        return matchesId && !user.deletedAt;
      });
      return Promise.resolve(user || null);
    }
    if (where?.email) {
      // Verificar email de forma case-insensitive (normalizado)
      // O email pode já estar normalizado (vindo do service) ou não
      const normalizedEmail = typeof where.email === 'string' 
        ? where.email.toLowerCase().trim() 
        : String(where.email).toLowerCase().trim();
      const found = this.users.find((user) => {
        if (user.deletedAt) return false; // Ignorar soft-deleted users
        if (!user.email) return false;
        const userEmail = String(user.email).toLowerCase().trim();
        return userEmail === normalizedEmail;
      });
      return Promise.resolve(found || null);
    }
    return Promise.resolve(null);
  }

  find(options: any = {}): Promise<any[]> {
    let result = [...this.users];

    // Filtrar usuários deletados (soft delete)
    result = result.filter((user) => !user.deletedAt);

    if (options.where) {
      const { where } = options;
      // Lidar com array de condições where (OR no TypeORM)
      if (Array.isArray(where)) {
        // Quando é array, significa OR - usuário deve satisfazer pelo menos uma condição
        result = result.filter((user) =>
          where.some((condition: any) => {
            let matches = true;
            // Verificar cada propriedade da condição
            if (condition.role !== undefined && user.role !== condition.role) matches = false;
            if (condition.isActive !== undefined && user.isActive !== condition.isActive) matches = false;
            if (condition.name) {
              let pattern: string;
              if (typeof condition.name === 'object' && condition.name._type === 'ilike') {
                pattern = condition.name._value.toLowerCase().replace(/%/g, '');
              } else {
                pattern = String(condition.name).toLowerCase().replace(/%/g, '');
              }
              if (pattern && !user.name?.toLowerCase().includes(pattern)) matches = false;
            }
            if (condition.email) {
              let pattern: string;
              if (typeof condition.email === 'object' && condition.email._type === 'ilike') {
                pattern = condition.email._value.toLowerCase().replace(/%/g, '');
              } else {
                pattern = String(condition.email).toLowerCase().replace(/%/g, '');
              }
              if (pattern && !user.email?.toLowerCase().includes(pattern)) matches = false;
            }
            return matches;
          }),
        );
      } else {
        // Condição única (AND)
        if (where.role !== undefined) {
          result = result.filter((user) => user.role === where.role);
        }
        if (where.isActive !== undefined) {
          result = result.filter((user) => user.isActive === where.isActive);
        }
        // Verificar se é um objeto ILike (do TypeORM)
        if (where.name) {
          let pattern: string;
          if (typeof where.name === 'object' && where.name._type === 'ilike') {
            pattern = where.name._value.toLowerCase().replace(/%/g, '');
          } else {
            pattern = String(where.name).toLowerCase().replace(/%/g, '');
          }
          if (pattern) {
            result = result.filter((user) => user.name?.toLowerCase().includes(pattern));
          }
        }
        if (where.email) {
          let pattern: string;
          if (typeof where.email === 'object' && where.email._type === 'ilike') {
            pattern = where.email._value.toLowerCase().replace(/%/g, '');
          } else {
            pattern = String(where.email).toLowerCase().replace(/%/g, '');
          }
          if (pattern) {
            result = result.filter((user) => user.email?.toLowerCase().includes(pattern));
          }
        }
      }
    }

    // Ordenação
    if (options.order) {
      const orderKey = Object.keys(options.order)[0];
      const orderDirection = options.order[orderKey];
      result.sort((a, b) => {
        const aVal = a[orderKey];
        const bVal = b[orderKey];
        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;
        if (orderDirection === 'DESC') {
          return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }

    // Paginação - aplicar DEPOIS da ordenação
    if (options.skip !== undefined && options.take !== undefined) {
      const start = Number(options.skip);
      const end = start + Number(options.take);
      result = result.slice(start, end);
    }

    return Promise.resolve(result);
  }

  async findAndCount(options: any = {}): Promise<[any[], number]> {
    // Primeiro aplicar filtros para contar o total filtrado (sem paginação)
    let filtered = [...this.users];
    
    // Filtrar usuários deletados
    filtered = filtered.filter((user) => !user.deletedAt);

    if (options.where) {
      const { where } = options;
      if (Array.isArray(where)) {
        // OR logic
        filtered = filtered.filter((user) =>
          where.some((condition: any) => {
            let matches = true;
            if (condition.role !== undefined && user.role !== condition.role) matches = false;
            if (condition.isActive !== undefined && user.isActive !== condition.isActive) matches = false;
            if (condition.name) {
              let pattern: string;
              if (typeof condition.name === 'object' && condition.name._type === 'ilike') {
                pattern = condition.name._value.toLowerCase().replace(/%/g, '');
              } else {
                pattern = String(condition.name).toLowerCase().replace(/%/g, '');
              }
              if (pattern && !user.name?.toLowerCase().includes(pattern)) matches = false;
            }
            if (condition.email) {
              let pattern: string;
              if (typeof condition.email === 'object' && condition.email._type === 'ilike') {
                pattern = condition.email._value.toLowerCase().replace(/%/g, '');
              } else {
                pattern = String(condition.email).toLowerCase().replace(/%/g, '');
              }
              if (pattern && !user.email?.toLowerCase().includes(pattern)) matches = false;
            }
            return matches;
          }),
        );
      } else {
        // AND logic
        if (where.role !== undefined) {
          filtered = filtered.filter((user) => user.role === where.role);
        }
        if (where.isActive !== undefined) {
          filtered = filtered.filter((user) => user.isActive === where.isActive);
        }
        if (where.name) {
          let pattern: string;
          if (typeof where.name === 'object' && where.name._type === 'ilike') {
            pattern = where.name._value.toLowerCase().replace(/%/g, '');
          } else {
            pattern = String(where.name).toLowerCase().replace(/%/g, '');
          }
          if (pattern) {
            filtered = filtered.filter((user) => user.name?.toLowerCase().includes(pattern));
          }
        }
        if (where.email) {
          let pattern: string;
          if (typeof where.email === 'object' && where.email._type === 'ilike') {
            pattern = where.email._value.toLowerCase().replace(/%/g, '');
          } else {
            pattern = String(where.email).toLowerCase().replace(/%/g, '');
          }
          if (pattern) {
            filtered = filtered.filter((user) => user.email?.toLowerCase().includes(pattern));
          }
        }
      }
    }

    const total = filtered.length;
    
    // Agora aplicar ordenação e paginação para os dados
    const data = await this.find(options);
    
    return [data, total];
  }

  async save(entity: any): Promise<any> {
    if (entity.id) {
      // Update
      const index = this.users.findIndex((user) => user.id === entity.id);
      if (index !== -1) {
        // Verificar duplicação de email ao atualizar (se email mudou)
        if (entity.email) {
          const normalizedEmail = entity.email.toLowerCase().trim();
          const existingWithEmail = this.users.find(
            (user) => user.id !== entity.id && user.email?.toLowerCase().trim() === normalizedEmail
          );
          if (existingWithEmail) {
            const error: any = new Error('Duplicate key');
            error.code = '23505';
            throw error;
          }
        }
        this.users[index] = { ...this.users[index], ...entity, updatedAt: new Date() };
        // Garantir que email está normalizado
        if (entity.email) {
          this.users[index].email = entity.email.toLowerCase().trim();
        }
        return Promise.resolve(this.users[index]);
      }
    } else {
      // Create - verificar se email já existe (normalizado)
      // Esta verificação é redundante (service.create já verifica via findOne),
      // mas mantemos para simular comportamento real do banco
      if (entity.email) {
        const normalizedEmail = entity.email.toLowerCase().trim();
        const existing = this.users.find(
          (user) => !user.deletedAt && user.email?.toLowerCase().trim() === normalizedEmail
        );
        if (existing) {
          // Simular erro de constraint do banco
          const error: any = new Error('Duplicate key');
          error.code = '23505';
          throw error;
        }
      }
      // Create - apenas se não tiver ID ainda
      const newUser = {
        id: entity.id || String(this.nextId++),
        ...entity,
        email: entity.email ? entity.email.toLowerCase().trim() : entity.email,
        createdAt: entity.createdAt || new Date(),
        updatedAt: entity.updatedAt || new Date(),
        version: entity.version || 1,
      };
      this.users.push(newUser);
      return Promise.resolve(newUser);
    }
    return Promise.resolve(entity);
  }

  remove(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  }

  softDelete(id: string): Promise<void> {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      user.deletedAt = new Date();
    }
    return Promise.resolve();
  }

  create(entityData: any): any {
    // O create do TypeORM apenas cria a entidade, não salva
    // O ID será gerado pelo save() se não existir
    // Retornar apenas os dados fornecidos, sem modificar
    return {
      ...entityData,
      // Não gerar ID aqui, deixar para o save()
      // Se já tem ID, preservar; se não, será gerado no save
    };
  }

  async preload(entityData: any): Promise<any> {
    if (!entityData || !entityData.id) {
      return null;
    }
    // Garantir que ID seja string para comparação consistente
    const searchId = String(entityData.id);
    // Buscar usuário que não está soft-deleted
    // Tentar comparação direta primeiro, depois conversão para string
    const existing = this.users.find((user) => {
      if (user.deletedAt) return false; // Ignorar soft-deleted users
      // Comparar ID de forma flexível (pode ser string ou número)
      return String(user.id) === searchId || user.id === entityData.id;
    });
    if (!existing) {
      return null;
    }
    // Merge com os dados fornecidos, mas preservar campos importantes
    const merged = {
      ...existing,
      ...entityData,
      // Preservar campos do usuário existente que não devem ser sobrescritos
      id: existing.id,
      createdAt: existing.createdAt,
      version: existing.version,
      // Preservar passwordHash se não foi fornecido novo password
      ...(entityData.passwordHash === undefined && existing.passwordHash ? { passwordHash: existing.passwordHash } : {}),
    };
    // Atualizar updatedAt
    merged.updatedAt = new Date();
    // Incrementar version se houver mudanças significativas
    if (entityData.name || entityData.email || entityData.passwordHash) {
      merged.version = (existing.version || 1) + 1;
    }
    return merged;
  }

  // Método para limpar o repositório fake (útil para beforeEach)
  clear(): void {
    this.users = [];
    this.nextId = 1;
  }

  // Método para adicionar dados de teste
  seed(users: any[]): void {
    this.users = users.map((user, index) => ({
      ...user,
      id: user.id || index + 1,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
      version: user.version || 1,
    }));
  }
}

// ============================================================================
// 6. UTILITÁRIOS PARA CONFIGURAÇÃO DE TESTES
// ============================================================================

export const createTestModule = (providers: any[] = []) => {
  return {
    providers: [
      ...providers,
      // Providers padrão para testes
      { provide: 'Logger', useValue: createDummyLogger() },
    ],
  };
};

export const createMockUser = (overrides: any = {}) => ({
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  passwordHash: 'hashed_password',
  role: 'STUDENT',
  isActive: true,
  avatarUrl: null,
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z'),
  version: 1,
  deletedAt: null,
  ...overrides,
});

export const createMockCreateUserDto = (overrides: any = {}) => ({
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: 'STUDENT',
  isActive: true,
  ...overrides,
});

// ============================================================================
// 7. UTILITÁRIOS PARA CONTROLE DE TEMPO
// ============================================================================

export const setupFakeTimers = (
  date: Date = new Date('2023-01-01T00:00:00Z'),
) => {
  jest.useFakeTimers();
  jest.setSystemTime(date);
};

export const restoreRealTimers = () => {
  jest.useRealTimers();
};

// ============================================================================
// 8. UTILITÁRIOS PARA RESET DE MOCKS
// ============================================================================

export const resetAllMocks = () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
};

export const setupTestEnvironment = () => {
  beforeEach(() => {
    resetAllMocks();
  });

  afterEach(() => {
    restoreRealTimers();
  });
};
