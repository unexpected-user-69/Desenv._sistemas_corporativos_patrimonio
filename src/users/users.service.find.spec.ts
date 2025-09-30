import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';

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
                Promise.resolve({ id: 'uuid', ...entity } as User),
              ),
            merge: jest.fn(
              (user: User, update: Partial<User>) =>
                ({ ...user, ...update }) as User,
            ),
            remove: jest.fn().mockResolvedValue(undefined),
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
