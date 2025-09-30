import { Repository } from 'typeorm';

/**
 * Fábrica de mocks para repositórios TypeORM
 * Fornece um mock completo e padronizado para testes
 */
export function createRepositoryMock<T>(): jest.Mocked<Repository<T>> {
  return {
    // Métodos básicos de busca
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    findOneBy: jest.fn().mockResolvedValue(null),
    findBy: jest.fn().mockResolvedValue([]),
    findAndCount: jest.fn().mockResolvedValue([[], 0]),
    findAndCountBy: jest.fn().mockResolvedValue([[], 0]),

    // Métodos de criação e salvamento
    create: jest
      .fn()
      .mockImplementation((entityLike: Partial<T>) => entityLike as T),
    save: jest.fn().mockImplementation((entity: T) => Promise.resolve(entity)),
    insert: jest
      .fn()
      .mockResolvedValue({ identifiers: [], generatedMaps: [], raw: [] }),
    update: jest
      .fn()
      .mockResolvedValue({ affected: 1, generatedMaps: [], raw: [] }),
    upsert: jest
      .fn()
      .mockResolvedValue({ identifiers: [], generatedMaps: [], raw: [] }),

    // Métodos de remoção
    remove: jest.fn().mockResolvedValue({} as T),
    delete: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),
    softDelete: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),
    restore: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),

    // Métodos de contagem
    count: jest.fn().mockResolvedValue(0),
    countBy: jest.fn().mockResolvedValue(0),

    // Métodos de existência
    exists: jest.fn().mockResolvedValue(false),
    existsBy: jest.fn().mockResolvedValue(false),

    // Métodos de query builder
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      andHaving: jest.fn().mockReturnThis(),
      orHaving: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      setParameter: jest.fn().mockReturnThis(),
      setParameters: jest.fn().mockReturnThis(),
      setLock: jest.fn().mockReturnThis(),
      useTransaction: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(null),
      getOneOrFail: jest.fn().mockResolvedValue(null),
      getMany: jest.fn().mockResolvedValue([]),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      getRawOne: jest.fn().mockResolvedValue(null),
      getRawMany: jest.fn().mockResolvedValue([]),
      getCount: jest.fn().mockResolvedValue(0),
      getSum: jest.fn().mockResolvedValue(0),
      getAverage: jest.fn().mockResolvedValue(0),
      getMin: jest.fn().mockResolvedValue(0),
      getMax: jest.fn().mockResolvedValue(0),
      execute: jest.fn().mockResolvedValue({}),
    }),

    // Métodos de transação
    manager: {
      transaction: jest.fn().mockImplementation((fn) => fn({})),
    } as any,

    // Métodos de metadados
    metadata: {
      name: 'mock_entity',
      tableName: 'mock_table',
      columns: [],
      relations: [],
      indices: [],
      uniques: [],
      checks: [],
      exclusions: [],
      foreignKeys: [],
      primaryColumns: [],
      hasMultiplePrimaryKeys: false,
      hasVirtualPrimaryColumns: false,
      hasUUIDPrimaryColumns: false,
      hasGeneratedPrimaryColumns: false,
      hasMultiplePrimaryKeys: false,
      hasMultiplePrimaryKeys: false,
    } as any,

    // Métodos de conexão
    query: jest.fn().mockResolvedValue([]),
    preload: jest
      .fn()
      .mockImplementation((entityLike: Partial<T>) => entityLike as T),
    merge: jest
      .fn()
      .mockImplementation((target: T, ...sources: Partial<T>[]) =>
        Object.assign(target, ...sources),
      ),

    // Métodos de cache
    clear: jest.fn().mockResolvedValue(undefined),

    // Métodos de listeners
    hasId: jest.fn().mockReturnValue(true),
    getId: jest.fn().mockReturnValue('mock-id'),
    recover: jest.fn().mockImplementation((entity: T) => entity),
    softRemove: jest.fn().mockResolvedValue({} as T),
    softRestore: jest.fn().mockResolvedValue({} as T),
  } as any;
}

/**
 * Helper para criar mocks específicos para testes de usuários
 */
export function createUserRepositoryMock() {
  const mock = createRepositoryMock();

  // Configurações específicas para usuários
  mock.findOne.mockImplementation((options: any) => {
    if (options?.where?.email === 'existing@example.com') {
      return Promise.resolve({
        id: 'user-1',
        name: 'Existing User',
        email: 'existing@example.com',
        passwordHash: 'hashed-password',
        role: 'STUDENT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      } as any);
    }
    return Promise.resolve(null);
  });

  mock.findAndCount.mockImplementation((options: any) => {
    const mockUsers = [
      {
        id: 'user-1',
        name: 'User One',
        email: 'user1@example.com',
        passwordHash: 'hashed-password',
        role: 'STUDENT',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      },
      {
        id: 'user-2',
        name: 'User Two',
        email: 'user2@example.com',
        passwordHash: 'hashed-password',
        role: 'TEACHER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      },
    ];

    return Promise.resolve([mockUsers, mockUsers.length]);
  });

  return mock;
}
