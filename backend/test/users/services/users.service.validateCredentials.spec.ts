import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { User } from '../../../src/users/entities/user.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { NormalizationService } from '../../../src/common/services/normalization.service';
import { FilterService } from '../../../src/common/services/filter.service';
import { makeUserEntity } from '../../factories/user.factory';

describe('UsersService.validateCredentials (unit)', () => {
  let service: UsersService;
  let repository: MockType<Repository<User>>;
  let hashService: Partial<HashService>;
  let normalizationService: Partial<NormalizationService>;
  let filterService: Partial<FilterService>;

  beforeEach(async () => {
    hashService = {
      hash: jest.fn(),
      compare: jest.fn().mockResolvedValue(true),
    };

    normalizationService = {
      normalizeEmail: jest.fn((email) => email.toLowerCase()),
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

  it('should return user when credentials are valid', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const entity = makeUserEntity({
      email,
      isActive: true,
      passwordHash: 'hashed-password',
    });

    repository.findOne.mockResolvedValue(entity as User);

    const result = await service.validateCredentials(email, password);

    expect(normalizationService.normalizeEmail).toHaveBeenCalledWith(email);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { email: email.toLowerCase() },
      select: expect.arrayContaining([
        'id',
        'email',
        'name',
        'role',
        'isActive',
        'passwordHash',
      ]),
    });
    expect(hashService.compare).toHaveBeenCalledWith(
      password,
      'hashed-password',
    );
    expect(result).toEqual(entity);
  });

  it('should return null when user does not exist', async () => {
    repository.findOne.mockResolvedValue(null);

    const result = await service.validateCredentials(
      'nonexistent@example.com',
      'password',
    );

    expect(result).toBeNull();
    expect(hashService.compare).not.toHaveBeenCalled();
  });

  it('should return null when user is inactive', async () => {
    const entity = makeUserEntity({
      email: 'test@example.com',
      isActive: false,
    });

    repository.findOne.mockResolvedValue(entity as User);

    const result = await service.validateCredentials(
      'test@example.com',
      'password',
    );

    expect(result).toBeNull();
    expect(hashService.compare).not.toHaveBeenCalled();
  });

  it('should return null when password is invalid', async () => {
    const entity = makeUserEntity({
      email: 'test@example.com',
      isActive: true,
      passwordHash: 'hashed-password',
    });

    repository.findOne.mockResolvedValue(entity as User);
    hashService.compare = jest.fn().mockResolvedValue(false);

    const result = await service.validateCredentials(
      'test@example.com',
      'wrong-password',
    );

    expect(result).toBeNull();
    expect(hashService.compare).toHaveBeenCalled();
  });
});

