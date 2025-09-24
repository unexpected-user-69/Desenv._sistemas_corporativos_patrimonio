import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn((payload) => payload),
            save: jest.fn(async (entity) => ({ id: 'uuid', ...entity })),
            merge: jest.fn((user, update) => ({ ...user, ...update })),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
    repo = moduleRef.get(getRepositoryToken(User));
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
