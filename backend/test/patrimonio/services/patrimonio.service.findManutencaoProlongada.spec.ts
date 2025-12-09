import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../../packages/patrimonio-service/src/patrimonio/services/storage.service';
import { PatrimonioStatus } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioService.findManutencaoProlongada (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;
  let storageService: Partial<StorageService>;
  let queryBuilder: any;

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
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: () => ({
            ...repositoryMockFactory(),
            createQueryBuilder: jest.fn(() => queryBuilder),
          }),
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

  it('should return patrimonios in manutencao prolongada', async () => {
    const dias = 90;
    const patrimonios = [
      makePatrimonioEntity({
        status: PatrimonioStatus.MANUTENCAO,
      }),
    ];

    queryBuilder.getMany.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findManutencaoProlongada(dias);

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('patrimonio');
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('should use default dias = 90 when not provided', async () => {
    const patrimonios = [
      makePatrimonioEntity({
        status: PatrimonioStatus.MANUTENCAO,
      }),
    ];

    queryBuilder.getMany.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findManutencaoProlongada();

    expect(result).toHaveLength(1);
  });

  it('should return empty array when no patrimonios found', async () => {
    queryBuilder.getMany.mockResolvedValue([]);

    const result = await service.findManutencaoProlongada(90);

    expect(result).toEqual([]);
  });
});
