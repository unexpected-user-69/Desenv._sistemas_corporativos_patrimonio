import { Test } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { makeCreateUserDto } from '../../factories/user.factory';
import { makeUserEntity } from '../../factories/user.factory';
import { randomUUID } from 'crypto';

describe('UsersController – create', () => {
  let controller: UsersController;
  const service = { create: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();
    controller = mod.get(UsersController);
    jest.clearAllMocks();
  });

  it('POST /users → delega ao service.create', async () => {
    const dto = makeCreateUserDto();
    const mockUser = makeUserEntity({
      name: dto.name,
      email: dto.email,
      role: dto.role,
      id: randomUUID(),
    });
    service.create.mockResolvedValue(mockUser);

    const res = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(res).toEqual(mockUser);
  });
});

