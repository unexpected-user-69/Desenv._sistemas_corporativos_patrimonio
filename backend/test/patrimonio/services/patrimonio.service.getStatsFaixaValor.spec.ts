import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.getStatsFaixaValor (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;
  let storageService: Partial<StorageService>;
  let queryBuilder: {
    select: jest.Mock;
    where: jest.Mock;
    getMany: jest.Mock;
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
      fileExists: jest.fn(),
      validateFile: jest.fn(),
    };

    queryBuilder = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
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

  it('should return stats by faixa valor successfully', async () => {
    const patrimonios = [
      makePatrimonioEntity({ valorAquisicao: 500 }),
      makePatrimonioEntity({ valorAquisicao: 1500 }),
      makePatrimonioEntity({ valorAquisicao: 2500 }),
    ];

    queryBuilder.getMany.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.getStatsFaixaValor(1000);

    expect(queryBuilder.select).toHaveBeenCalled();
    expect(queryBuilder.where).toHaveBeenCalled();
    expect(result).toHaveProperty('faixas');
    expect(result).toHaveProperty('intervalo', 1000);
    expect(Array.isArray(result.faixas)).toBe(true);
  });

  it('should use default intervalo when not provided', async () => {
    queryBuilder.getMany.mockResolvedValue([]);

    const result = await service.getStatsFaixaValor();

    expect(result.intervalo).toBe(1000);
  });
});
