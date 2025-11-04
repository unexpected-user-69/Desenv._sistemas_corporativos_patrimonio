import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { User } from '../../../src/users/entities/user.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { NormalizationService } from '../../../src/common/services/normalization.service';
import { FilterService } from '../../../src/common/services/filter.service';
import { makeCreateUserDto, makeUserEntity } from '../../factories/user.factory';

describe('UsersService.create (unit)', () => {
  let service: UsersService;
  let repository: MockType<Repository<User>>;
  let hashService: Partial<HashService>;
  let normalizationService: Partial<NormalizationService>;
  let filterService: Partial<FilterService>;

  beforeEach(async () => {
    hashService = {
      hash: jest.fn().mockResolvedValue('hashed-password'),
      compare: jest.fn(),
    };

    normalizationService = {
      normalizeEmail: jest.fn((email) => email.toLowerCase()),
      normalizeName: jest.fn((name) => name.trim()),
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

  it('should create a user successfully', async () => {
    const dto = makeCreateUserDto();
    const entity = makeUserEntity({
      ...dto,
      passwordHash: 'hashed-password',
    });

    repository.findOne.mockResolvedValue(null); // Email não existe
    repository.create.mockReturnValue(entity as User);
    repository.save.mockResolvedValue(entity as User);

    const result = await service.create(dto);

    expect(normalizationService.normalizeEmail).toHaveBeenCalledWith(dto.email);
    expect(normalizationService.normalizeName).toHaveBeenCalledWith(dto.name);
    expect(hashService.hash).toHaveBeenCalledWith(dto.password);
    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      name: entity.name,
      email: entity.email,
      role: entity.role,
    });
    expect((result as any).passwordHash).toBeUndefined();
  });

  it('should throw ConflictException if email already exists', async () => {
    const dto = makeCreateUserDto();
    const existingUser = makeUserEntity({ email: dto.email });

    repository.findOne.mockResolvedValue(existingUser as User);

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { email: dto.email.toLowerCase() },
    });
    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should normalize email and name before creating', async () => {
    const dto = makeCreateUserDto({
      email: '  TEST@EXAMPLE.COM  ',
      name: '  John Doe  ',
    });
    const entity = makeUserEntity({
      email: 'test@example.com',
      name: 'John Doe',
      passwordHash: 'hashed-password',
    });

    repository.findOne.mockResolvedValue(null);
    repository.create.mockReturnValue(entity as User);
    repository.save.mockResolvedValue(entity as User);

    await service.create(dto);

    expect(normalizationService.normalizeEmail).toHaveBeenCalledWith(
      '  TEST@EXAMPLE.COM  ',
    );
    expect(normalizationService.normalizeName).toHaveBeenCalledWith(
      '  John Doe  ',
    );
  });
});

