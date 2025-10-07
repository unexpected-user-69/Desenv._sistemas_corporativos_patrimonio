import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';

describe('UsersService', () => {
  let service: UsersService;
  // Nota: repositório é mockado mas não usado diretamente nos testes

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([] as User[]),
            findOne: jest.fn().mockResolvedValue(null as unknown as User),
            create: jest.fn((payload: Partial<User>) => payload as User),
            save: jest
              .fn()
              .mockImplementation((entity: User) =>
                Promise.resolve({ ...entity, id: 'uuid' } as User),
              ),
            merge: jest.fn(
              (user: User, update: Partial<User>) =>
                ({ ...user, ...update }) as User,
            ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: HashService,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashed-password-123'),
            compare: jest.fn(),
            generateSalt: jest.fn(),
            isValidHash: jest.fn(),
          },
        },
        {
          provide: NormalizationService,
          useValue: {
            normalizeEmail: jest.fn((email) => email.toLowerCase()),
            normalizeName: jest.fn((name) => name.trim()),
            normalizeText: jest.fn(),
            cleanForSearch: jest.fn(),
            capitalizeWords: jest.fn(),
          },
        },
        {
          provide: FilterService,
          useValue: {
            buildAdvancedFilters: jest.fn(),
            buildCursorFilters: jest.fn(),
            generateCursor: jest.fn(),
            isValidSortOption: jest.fn(),
            generateFuzzyPatterns: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
    // repo = moduleRef.get(getRepositoryToken(User));
  });

  it('findAll retorna lista', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('create cria usuário com defaults', async () => {
    const created = await service.create({
      name: 'John',
      email: 'john@example.com',
      password: 'secret12',
      role: UserRole.STUDENT,
    });
    expect(created.id).toBeDefined();
    expect(created.name).toBe('John');
  });
});
