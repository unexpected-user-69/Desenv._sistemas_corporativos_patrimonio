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
    const { where } = options;
    if (where?.id) {
      return Promise.resolve(
        this.users.find((user) => user.id === where.id) || null,
      );
    }
    if (where?.email) {
      // Verificar email de forma case-insensitive (normalizado)
      const normalizedEmail = where.email.toLowerCase().trim();
      return Promise.resolve(
        this.users.find((user) => user.email?.toLowerCase().trim() === normalizedEmail) || null,
      );
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
            if (condition.name && !user.name?.toLowerCase().includes(condition.name.toLowerCase().replace(/%/g, ''))) matches = false;
            if (condition.email && !user.email?.toLowerCase().includes(condition.email.toLowerCase().replace(/%/g, ''))) matches = false;
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
        if (where.name) {
          const pattern = where.name.toLowerCase().replace(/%/g, '');
          result = result.filter((user) => user.name?.toLowerCase().includes(pattern));
        }
        if (where.email) {
          const pattern = where.email.toLowerCase().replace(/%/g, '');
          result = result.filter((user) => user.email?.toLowerCase().includes(pattern));
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
            if (condition.name && !user.name?.toLowerCase().includes(condition.name.toLowerCase().replace(/%/g, ''))) matches = false;
            if (condition.email && !user.email?.toLowerCase().includes(condition.email.toLowerCase().replace(/%/g, ''))) matches = false;
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
          const pattern = where.name.toLowerCase().replace(/%/g, '');
          filtered = filtered.filter((user) => user.name?.toLowerCase().includes(pattern));
        }
        if (where.email) {
          const pattern = where.email.toLowerCase().replace(/%/g, '');
          filtered = filtered.filter((user) => user.email?.toLowerCase().includes(pattern));
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
        this.users[index] = { ...this.users[index], ...entity, updatedAt: new Date() };
        return Promise.resolve(this.users[index]);
      }
    } else {
      // Create - verificar se email já existe (normalizado)
      if (entity.email) {
        const normalizedEmail = entity.email.toLowerCase().trim();
        const existing = this.users.find(
          (user) => user.email?.toLowerCase().trim() === normalizedEmail
        );
        if (existing) {
          // Simular erro de constraint do banco
          const error: any = new Error('Duplicate key');
          error.code = '23505';
          throw error;
        }
      }
      // Create
      const newUser = {
        id: this.nextId++,
        ...entity,
        email: entity.email?.toLowerCase().trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
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
    return {
      ...entityData,
      id: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
  }

  async preload(entityData: any): Promise<any> {
    if (!entityData.id) {
      return null;
    }
    const existing = this.users.find((user) => user.id === entityData.id);
    if (!existing) {
      return null;
    }
    // Merge com os dados fornecidos
    return {
      ...existing,
      ...entityData,
    };
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
