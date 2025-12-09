import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../../packages/patrimonio-service/src/patrimonio/services/storage.service';
import { UpdateBulkPatrimonioDto } from '../../../../packages/patrimonio-service/src/patrimonio/dto/update-bulk-patrimonio.dto';
import { PatrimonioStatus } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { randomUUID } from 'crypto';

describe('PatrimonioService.updateBulk (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;
  let storageService: Partial<StorageService>;
  let dataSource: DataSource;
  let queryRunner: Partial<QueryRunner>;

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

    queryRunner = {
      connect: jest.fn().mockResolvedValue(undefined),
      startTransaction: jest.fn().mockResolvedValue(undefined),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      rollbackTransaction: jest.fn().mockResolvedValue(undefined),
      release: jest.fn().mockResolvedValue(undefined),
      manager: {
        save: jest.fn(),
      } as any,
    };

    const mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunner),
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
          useValue: mockDataSource,
        },
        {
          provide: StorageService,
          useValue: storageService,
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
    dataSource = module.get(DataSource);
  });

  it('should update multiple patrimonios successfully', async () => {
    const id1 = randomUUID();
    const id2 = randomUUID();
    const dto: UpdateBulkPatrimonioDto = {
      ids: [id1, id2],
      dados: {
        status: PatrimonioStatus.ATIVO,
        localizacao: 'Nova Sala 201',
      },
    };

    const patrimonio1 = makePatrimonioEntity({ id: id1 });
    const patrimonio2 = makePatrimonioEntity({ id: id2 });

    repository.find.mockResolvedValue([
      patrimonio1,
      patrimonio2,
    ] as Patrimonio[]);
    queryRunner.manager!.save!.mockResolvedValueOnce(patrimonio1 as Patrimonio);
    queryRunner.manager!.save!.mockResolvedValueOnce(patrimonio2 as Patrimonio);

    const result = await service.updateBulk(dto);

    expect(repository.find).toHaveBeenCalledWith({
      where: { id: expect.anything() },
    });
    expect(queryRunner.commitTransaction).toHaveBeenCalled();
    expect(result.atualizados).toBe(2);
  });

  it('should throw NotFoundException when some IDs not found', async () => {
    const id1 = randomUUID();
    const id2 = randomUUID();
    const id3 = randomUUID();
    const dto: UpdateBulkPatrimonioDto = {
      ids: [id1, id2, id3],
      dados: { status: PatrimonioStatus.ATIVO },
    };

    const patrimonio1 = makePatrimonioEntity({ id: id1 });

    repository.find.mockResolvedValue([patrimonio1] as Patrimonio[]);

    await expect(service.updateBulk(dto)).rejects.toThrow(NotFoundException);
    expect(queryRunner.startTransaction).not.toHaveBeenCalled();
  });
});
