import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { randomUUID } from 'crypto';

describe('UsersController – remove', () => {
  let controller: UsersController;
  const service = { remove: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();
    controller = mod.get(UsersController);
    jest.clearAllMocks();
  });

  it('DELETE /users/:id → delega ao service.remove', async () => {
    const id = randomUUID();
    service.remove.mockResolvedValue(undefined);

    await controller.remove(id);

    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('should throw NotFoundException when user not found', async () => {
    const id = randomUUID();
    service.remove.mockRejectedValue(
      new NotFoundException(`User with ID "${id}" not found`),
    );

    await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});

