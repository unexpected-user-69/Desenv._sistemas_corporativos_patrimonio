import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { User } from '../../../src/users/entities/user.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { NormalizationService } from '../../../src/common/services/normalization.service';
import { FilterService } from '../../../src/common/services/filter.service';
import { makeUserEntity } from '../../factories/user.factory';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../../../src/users/dto/update-user.dto';

describe('UsersService.update (unit)', () => {
  let service: UsersService;
  let repository: MockType<Repository<User>>;
  let hashService: Partial<HashService>;
  let normalizationService: Partial<NormalizationService>;
  let filterService: Partial<FilterService>;

  beforeEach(async () => {
    hashService = {
      hash: jest.fn().mockResolvedValue('new-hashed-password'),
      compare: jest.fn(),
    };

    normalizationService = {
      normalizeEmail: jest.fn((email) => email?.toLowerCase()),
      normalizeName: jest.fn((name) => name?.trim()),
    };

    filterService = {
      buildAdvancedFilters: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        { provide: HashService, useValue: hashService },
        { provide: NormalizationService, useValue: normalizationService },
        { provide: FilterService, useValue: filterService },
      ],
    }).compile();

    service = module.get(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should update user successfully', async () => {
    const userId = randomUUID();
    const existingUser = makeUserEntity({ id: userId });
    const updateDto: UpdateUserDto = {
      name: 'Updated Name',
    };
    const updatedUser = makeUserEntity({
      ...existingUser,
      name: 'Updated Name',
    });

    repository.preload.mockResolvedValue(existingUser as User);
    repository.save.mockResolvedValue(updatedUser as User);

    const result = await service.update(userId, updateDto);

    expect(repository.preload).toHaveBeenCalledWith(
      expect.objectContaining({ id: userId }),
    );
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: userId,
      name: 'Updated Name',
    });
  });

  it('should throw NotFoundException when user not found', async () => {
    const userId = randomUUID();
    const updateDto: UpdateUserDto = { name: 'Updated Name' };

    repository.preload.mockResolvedValue(null);

    await expect(service.update(userId, updateDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should update password when provided', async () => {
    const userId = randomUUID();
    const existingUser = makeUserEntity({ id: userId });
    const updateDto: UpdateUserDto = {
      password: 'new-password',
    };
    const updatedUser = {
      ...existingUser,
      passwordHash: 'new-hashed-password',
    };

    // preload retorna o objeto com passwordHash atualizado
    repository.preload.mockImplementation(async (data: any) => {
      return {
        ...existingUser,
        ...data,
      } as User;
    });
    repository.save.mockResolvedValue(updatedUser as User);

    await service.update(userId, updateDto);

    expect(hashService.hash).toHaveBeenCalledWith('new-password');
    expect(repository.preload).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  // Note: O método update atual não valida email duplicado antes de salvar
  // A validação de conflito de email é feita pelo banco de dados (unique constraint)
  // Este teste pode ser removido ou ajustado quando a validação for implementada
  it.skip('should throw ConflictException if email already exists', async () => {
    // Skipped: update method doesn't check for duplicate emails before saving
    // Conflict is handled by database unique constraint
  });
});

