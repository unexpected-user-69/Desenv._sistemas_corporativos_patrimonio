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
import { QueryCategoriasMultiplasDto } from '../../../../packages/patrimonio-service/src/patrimonio/dto/query-categorias-multiplas.dto';
import { randomUUID } from 'crypto';

describe('PatrimonioService.findByCategoriasMultiplas (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;
  let storageService: Partial<StorageService>;

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

    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: repositoryMockFactory,
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

  it('should return patrimonios by multiple categorias', async () => {
    const categoriaId1 = randomUUID();
    const categoriaId2 = randomUUID();
    const dto: QueryCategoriasMultiplasDto = {
      categoriaIds: [categoriaId1, categoriaId2],
    };
    const patrimonios = [
      makePatrimonioEntity({ categoriaId: categoriaId1 }),
      makePatrimonioEntity({ categoriaId: categoriaId2 }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findByCategoriasMultiplas(dto);

    expect(repository.find).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no patrimonios found', async () => {
    const dto: QueryCategoriasMultiplasDto = {
      categoriaIds: [randomUUID()],
    };

    repository.find.mockResolvedValue([]);

    const result = await service.findByCategoriasMultiplas(dto);

    expect(result).toEqual([]);
  });
});
