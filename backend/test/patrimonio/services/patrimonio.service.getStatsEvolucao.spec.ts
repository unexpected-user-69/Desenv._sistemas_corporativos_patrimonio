import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.getStatsEvolucao (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;
  let storageService: Partial<StorageService>;
  let queryBuilder: {
    select: jest.Mock;
    addSelect: jest.Mock;
    where: jest.Mock;
    andWhere: jest.Mock;
    orderBy: jest.Mock;
    getMany: jest.Mock;
    getRawMany: jest.Mock;
  };

  beforeEach(async () => {
    usersHttpClient = {
      findOne: jest.fn(),
    };

    categoriasHttpClient = {
      findOne: jest.fn(),
    };

    storageService = {
      saveFile: jest.fn(),
      deleteFile: jest.fn(),
      validateFile: jest.fn(),
      fileExists: jest.fn(),
    };

    queryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
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
          provide: getRepositoryToken(PatrimonioLocalizacaoHistorico),
          useFactory: repositoryMockFactory,
        },
        {
          provide: UsersHttpClient,
          useValue: usersHttpClient,
        },
        {
          provide: CategoriasHttpClient,
          useValue: categoriasHttpClient,
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
            createQueryRunner: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: storageService,
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should return stats evolucao for mensal period', async () => {
    queryBuilder.getMany.mockResolvedValue([]);
    queryBuilder.getRawMany.mockResolvedValue([]);

    const result = await service.getStatsEvolucao('mensal', 2025);

    expect(queryBuilder.select).toHaveBeenCalled();
    expect(result).toHaveProperty('evolucao');
    expect(result).toHaveProperty('tipoPeriodo', 'mensal');
    expect(Array.isArray(result.evolucao)).toBe(true);
  });

  it('should use current year when ano not provided', async () => {
    queryBuilder.getMany.mockResolvedValue([]);
    queryBuilder.getRawMany.mockResolvedValue([]);

    const result = await service.getStatsEvolucao('mensal');

    expect(queryBuilder.select).toHaveBeenCalled();
    expect(result.tipoPeriodo).toBe('mensal');
  });
});
