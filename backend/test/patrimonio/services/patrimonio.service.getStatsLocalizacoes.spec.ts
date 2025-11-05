import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.getStatsLocalizacoes (unit)', () => {
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

  it('should return stats by localizacao successfully', async () => {
    const mockRawResults = [
      { localizacao: 'Sala 205', quantidade: '10', valorTotal: '50000' },
      { localizacao: 'Sala 101', quantidade: '5', valorTotal: '25000' },
    ];

    queryBuilder.getRawMany.mockResolvedValue(mockRawResults);

    const result = await service.getStatsLocalizacoes();

    expect(queryBuilder.select).toHaveBeenCalled();
    expect(queryBuilder.where).toHaveBeenCalled();
    expect(queryBuilder.groupBy).toHaveBeenCalled();
    expect(result.localizacoes).toHaveLength(2);
    expect(result.localizacoes[0]).toMatchObject({
      localizacao: 'Sala 205',
      quantidade: 10,
      valorTotal: 50000,
    });
    expect(result.totalLocalizacoes).toBe(2);
  });

  it('should return empty stats when no patrimonios with localizacao', async () => {
    queryBuilder.getRawMany.mockResolvedValue([]);

    const result = await service.getStatsLocalizacoes();

    expect(result.localizacoes).toEqual([]);
    expect(result.totalLocalizacoes).toBe(0);
  });
});
