import { Test } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { makeUserEntity } from '../../factories/user.factory';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { AuthUser } from '../../../src/auth/strategies/jwt.strategy';

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

  it('GET /users/:id → delega ao service.findOne com usuário autenticado', async () => {
    const id = randomUUID();
    const mockUser = makeUserEntity({ id });
    const mockAuthUser: AuthUser = {
      sub: id,
      email: 'test@example.com',
      roles: ['OPERATOR'],
    };
    const mockRequest = {
      user: mockAuthUser,
    } as Request & { user?: AuthUser };

    service.findOne.mockResolvedValue(mockUser);

    const res = await controller.findOne(id, mockRequest);

    expect(service.findOne).toHaveBeenCalledWith(id, id, ['OPERATOR']);
    expect(res).toEqual(mockUser);
  });

  it('should throw UnauthorizedException when user is not authenticated', async () => {
    const id = randomUUID();
    const mockRequest = {} as Request & { user?: AuthUser };
    // Garantir que user seja undefined explicitamente
    mockRequest.user = undefined;

    try {
      await controller.findOne(id, mockRequest);
      // Se chegou aqui, a exceção não foi lançada
      fail('Expected UnauthorizedException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).message).toBe(
        'Usuário não autenticado',
      );
    }
    expect(service.findOne).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when user not found', async () => {
    const id = randomUUID();
    const mockAuthUser: AuthUser = {
      sub: id,
      email: 'test@example.com',
      roles: ['OPERATOR'],
    };
    const mockRequest = {
      user: mockAuthUser,
    } as Request & { user?: AuthUser };

    service.findOne.mockRejectedValue(
      new NotFoundException(`User with ID "${id}" not found`),
    );

    await expect(controller.findOne(id, mockRequest)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.findOne).toHaveBeenCalledWith(id, id, ['OPERATOR']);
  });
});

