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
      return Promise.resolve(
        this.users.find((user) => user.email === where.email) || null,
      );
    }
    return Promise.resolve(null);
  }

  find(options: any = {}): Promise<any[]> {
    let result = [...this.users];

    if (options.where) {
      const { where } = options;
      if (where.role) {
        result = result.filter((user) => user.role === where.role);
      }
      if (where.isActive !== undefined) {
        result = result.filter((user) => user.isActive === where.isActive);
      }
    }

    if (options.skip && options.take) {
      const start = Number(options.skip);
      const end = start + Number(options.take);
      result = result.slice(start, end);
    }

    return Promise.resolve(result);
  }

  async findAndCount(options: any = {}): Promise<[any[], number]> {
    const data = await this.find(options);
    const total = this.users.length;
    return [data, total];
  }

  save(entity: any): Promise<any> {
    if (entity.id) {
      // Update
      const index = this.users.findIndex((user) => user.id === entity.id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...entity };
        return Promise.resolve(this.users[index]);
      }
    } else {
      // Create
      const newUser = {
        id: this.nextId++,
        ...entity,
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
