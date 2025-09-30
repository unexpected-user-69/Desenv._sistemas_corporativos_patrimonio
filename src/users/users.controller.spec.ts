import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const serviceMock: Partial<UsersService> = {
    findAll: jest.fn().mockResolvedValue([] as User[]),
    findOne: jest.fn().mockResolvedValue({ id: 'u1' } as User),
    create: jest.fn().mockResolvedValue({ id: 'u2' } as User),
    update: jest.fn().mockResolvedValue({ id: 'u3' } as User),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }],
    }).compile();

    controller = moduleRef.get(UsersController);
  });

  it('findAll', async () => {
    const res = await controller.findAll();
    expect(res).toEqual([]);
  });

  it('create', async () => {
    const res = await controller.create({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'secret12',
      role: UserRole.STUDENT,
    });
    expect(res).toEqual({ id: 'u2' });
  });
});
