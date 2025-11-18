import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;

  const serviceMock: Partial<UsersService> = {
    findAll: jest.fn().mockResolvedValue([] as User[]),
    findAllPaginated: jest.fn().mockResolvedValue({
      data: [] as User[],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }),
    findAllWithAdvancedFilters: jest.fn().mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    }),
    findOne: jest.fn().mockResolvedValue({ id: 'u1' } as User),
    create: jest.fn().mockResolvedValue({ id: 'u2', name: '', email: '', role: UserRole.OPERATOR, isActive: true, createdAt: new Date(), updatedAt: new Date(), version: 1 } as User),
    update: jest.fn().mockResolvedValue({ id: 'u3' } as User),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = moduleRef.get(UsersController);
  });

  it('findAll', async () => {
    const mockResult = {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    (serviceMock.findAllWithAdvancedFilters as jest.Mock).mockResolvedValue(mockResult);
    const res = await controller.findAll({});
    expect(res).toEqual(mockResult);
    expect(serviceMock.findAllWithAdvancedFilters).toHaveBeenCalledWith({});
  });

  it('create', async () => {
    const mockUser = {
      id: 'u2',
      name: 'Jane',
      email: 'jane@example.com',
      role: UserRole.OPERATOR,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    (serviceMock.create as jest.Mock).mockResolvedValue(mockUser);
    const res = await controller.create({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'secret12',
      role: UserRole.OPERATOR,
    });
    expect(res).toEqual(mockUser);
    expect(serviceMock.create).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'secret12',
      role: UserRole.OPERATOR,
    });
  });
});
