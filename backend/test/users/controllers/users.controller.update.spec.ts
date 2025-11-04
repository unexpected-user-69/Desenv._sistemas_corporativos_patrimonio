import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { UpdateUserDto } from '../../../src/users/dto/update-user.dto';
import { makeUserEntity } from '../../factories/user.factory';
import { randomUUID } from 'crypto';

describe('UsersController – update', () => {
  let controller: UsersController;
  const service = { update: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();
    controller = mod.get(UsersController);
    jest.clearAllMocks();
  });

  it('PUT /users/:id → delega ao service.update', async () => {
    const id = randomUUID();
    const requesterId = randomUUID();
    const dto: UpdateUserDto = { name: 'Nome Atualizado' };
    const mockUser = makeUserEntity({ id, name: dto.name });
    service.update.mockResolvedValue(mockUser);

    const res = await controller.update(id, dto, requesterId);

    expect(service.update).toHaveBeenCalledWith(id, dto);
    expect(res).toEqual(mockUser);
  });

  it('should throw NotFoundException when user not found', async () => {
    const id = randomUUID();
    const requesterId = randomUUID();
    const dto: UpdateUserDto = { name: 'Nome Atualizado' };
    service.update.mockRejectedValue(
      new NotFoundException(`User with ID "${id}" not found`),
    );

    await expect(controller.update(id, dto, requesterId)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });
});

