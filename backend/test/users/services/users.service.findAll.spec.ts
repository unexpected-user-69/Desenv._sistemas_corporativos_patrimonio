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

describe('UsersService.findAll (unit)', () => {
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

  it('should return all users', async () => {
    const users = [
      makeUserEntity({ name: 'User 1' }),
      makeUserEntity({ name: 'User 2' }),
    ];

    repository.find.mockResolvedValue(users as User[]);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      name: 'User 1',
    });
    expect((result[0] as any).passwordHash).toBeUndefined();
  });

  it('should return empty array when no users exist', async () => {
    repository.find.mockResolvedValue([]);

    const result = await service.findAll();

    expect(result).toEqual([]);
  });
});

