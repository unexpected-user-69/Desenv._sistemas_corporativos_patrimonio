import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { User } from '../../../src/users/entities/user.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { NormalizationService } from '../../../src/common/services/normalization.service';
import { FilterService } from '../../../src/common/services/filter.service';
import { makeUserEntity } from '../../factories/user.factory';
import { randomUUID } from 'crypto';

describe('UsersService.findOne (unit)', () => {
  let service: UsersService;
  let repository: MockType<Repository<User>>;
  let hashService: Partial<HashService>;
  let normalizationService: Partial<NormalizationService>;
  let filterService: Partial<FilterService>;

  beforeEach(async () => {
    hashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    normalizationService = {
      normalizeEmail: jest.fn(),
      normalizeName: jest.fn(),
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

  it('should return user when found (without authentication)', async () => {
    const userId = randomUUID();
    const entity = makeUserEntity({ id: userId });

    repository.findOne.mockResolvedValue(entity as User);

    const result = await service.findOne(userId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      withDeleted: false,
    });
    expect(result).toMatchObject({
      id: userId,
      name: entity.name,
      email: entity.email,
    });
    expect((result as any).passwordHash).toBeUndefined();
  });

  it('should return user when found (self access)', async () => {
    const userId = randomUUID();
    const entity = makeUserEntity({ id: userId });

    repository.findOne.mockResolvedValue(entity as User);

    const result = await service.findOne(userId, userId, ['OPERATOR']);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      withDeleted: false,
    });
    expect(result).toMatchObject({
      id: userId,
      name: entity.name,
      email: entity.email,
    });
  });

  it('should return user when found (admin access)', async () => {
    const userId = randomUUID();
    const adminId = randomUUID();
    const entity = makeUserEntity({ id: userId });

    repository.findOne.mockResolvedValue(entity as User);

    const result = await service.findOne(userId, adminId, ['ADMIN']);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      withDeleted: false,
    });
    expect(result).toMatchObject({
      id: userId,
      name: entity.name,
      email: entity.email,
    });
  });

  it('should throw NotFoundException when user not found', async () => {
    const userId = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      withDeleted: false,
    });
  });

  describe('Authorization: self-or-admin', () => {
    it('should throw ForbiddenException when user tries to access another user data (not admin)', async () => {
      const userId = randomUUID();
      const otherUserId = randomUUID();
      const entity = makeUserEntity({ id: userId });

      repository.findOne.mockResolvedValue(entity as User);

      await expect(
        service.findOne(userId, otherUserId, ['OPERATOR']),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        withDeleted: false,
      });
    });

    it('should allow access when user is admin (different user)', async () => {
      const userId = randomUUID();
      const adminId = randomUUID();
      const entity = makeUserEntity({ id: userId });

      repository.findOne.mockResolvedValue(entity as User);

      const result = await service.findOne(userId, adminId, ['ADMIN']);

      expect(result).toMatchObject({
        id: userId,
        name: entity.name,
        email: entity.email,
      });
    });

    it('should allow access when user accesses own data (self)', async () => {
      const userId = randomUUID();
      const entity = makeUserEntity({ id: userId });

      repository.findOne.mockResolvedValue(entity as User);

      const result = await service.findOne(userId, userId, ['OPERATOR']);

      expect(result).toMatchObject({
        id: userId,
        name: entity.name,
        email: entity.email,
      });
    });

    it('should allow access when user has ADMIN role among multiple roles', async () => {
      const userId = randomUUID();
      const adminId = randomUUID();
      const entity = makeUserEntity({ id: userId });

      repository.findOne.mockResolvedValue(entity as User);

      const result = await service.findOne(userId, adminId, [
        'OPERATOR',
        'ADMIN',
        'MANAGER',
      ]);

      expect(result).toMatchObject({
        id: userId,
        name: entity.name,
        email: entity.email,
      });
    });
  });
});

