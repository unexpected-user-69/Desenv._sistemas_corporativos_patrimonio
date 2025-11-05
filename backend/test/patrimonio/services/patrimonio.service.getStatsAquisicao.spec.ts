import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.getStatsAquisicao (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let queryBuilder: {
    select: jest.Mock;
    addSelect: jest.Mock;
    where: jest.Mock;
    groupBy: jest.Mock;
    orderBy: jest.Mock;
    getRawMany: jest.Mock;
  };

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    queryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: () => ({
            ...repositoryMockFactory<Patrimonio>(),
            createQueryBuilder: jest.fn(() => queryBuilder),
          }),
        },
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
            createQueryRunner: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should return stats by aquisicao for mensal period', async () => {
    const mockRawResults = [
      { periodo: new Date('2025-01-01'), quantidade: '10', valorTotal: '50000' },
    ];

    queryBuilder.getRawMany.mockResolvedValue(mockRawResults);

    const result = await service.getStatsAquisicao('mensal');

    expect(queryBuilder.select).toHaveBeenCalled();
    expect(result).toHaveProperty('periodos');
    expect(result).toHaveProperty('tipoPeriodo', 'mensal');
    expect(Array.isArray(result.periodos)).toBe(true);
  });

  it('should use default periodo when not provided', async () => {
    queryBuilder.getRawMany.mockResolvedValue([]);

    const result = await service.getStatsAquisicao();

    expect(result.tipoPeriodo).toBe('mensal');
  });
});
