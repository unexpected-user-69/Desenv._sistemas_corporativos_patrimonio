import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { makeUserEntity } from '../../factories/user.factory';
import { randomUUID } from 'crypto';

describe('UsersController – findOne', () => {
  let controller: UsersController;
  const service = { findOne: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();
    controller = mod.get(UsersController);
    jest.clearAllMocks();
  });

  it('GET /users/:id → delega ao service.findOne', async () => {
    const id = randomUUID();
    const mockUser = makeUserEntity({ id });
    service.findOne.mockResolvedValue(mockUser);

    const res = await controller.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(res).toEqual(mockUser);
  });

  it('should throw NotFoundException when user not found', async () => {
    const id = randomUUID();
    service.findOne.mockRejectedValue(
      new NotFoundException(`User with ID "${id}" not found`),
    );

    await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });
});

