import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';
import { CreateBulkPatrimonioDto } from '../../../src/patrimonio/dto/create-bulk-patrimonio.dto';
import { makeCreatePatrimonioDto } from '../../factories/patrimonio.factory';

describe('PatrimonioService.createBulkWithTransaction (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let historicoRepository: MockType<Repository<PatrimonioLocalizacaoHistorico>>;
  let usersService: Partial<UsersService>;
  let storageService: Partial<StorageService>;
  let dataSource: DataSource;
  let queryRunner: Partial<QueryRunner>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    storageService = {};

    const managerMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    queryRunner = {
      connect: jest.fn().mockResolvedValue(undefined),
      startTransaction: jest.fn().mockResolvedValue(undefined),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      rollbackTransaction: jest.fn().mockResolvedValue(undefined),
      release: jest.fn().mockResolvedValue(undefined),
      manager: managerMock as any,
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
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: StorageService,
          useValue: storageService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
    historicoRepository = module.get(getRepositoryToken(PatrimonioLocalizacaoHistorico));
    dataSource = module.get(DataSource);
  });

  it('should create multiple patrimonios successfully', async () => {
    const dto: CreateBulkPatrimonioDto = {
      patrimonios: [
        makeCreatePatrimonioDto({ codigo: 'PAT-001' }),
        makeCreatePatrimonioDto({ codigo: 'PAT-002' }),
      ],
    };

    const created1 = makePatrimonioEntity({ codigo: 'PAT-001' });
    const created2 = makePatrimonioEntity({ codigo: 'PAT-002' });

    (queryRunner.manager!.findOne as jest.Mock).mockResolvedValue(null); // Códigos não existem
    (queryRunner.manager!.create as jest.Mock).mockImplementation((_entity: any, data: any) => data);
    (queryRunner.manager!.save as jest.Mock)
      .mockResolvedValueOnce(created1 as Patrimonio)
      .mockResolvedValueOnce(created2 as Patrimonio);

    const result = await service.createBulkWithTransaction(dto);

    expect(dataSource.createQueryRunner).toHaveBeenCalled();
    expect(queryRunner.connect).toHaveBeenCalled();
    expect(queryRunner.startTransaction).toHaveBeenCalled();
    expect(queryRunner.commitTransaction).toHaveBeenCalled();
    expect(queryRunner.release).toHaveBeenCalled();
    expect(result.totalSucessos).toBe(2);
    expect(result.totalErros).toBe(0);
    expect(result.sucessos).toHaveLength(2);
  });

  it('should handle errors and continue processing', async () => {
    const dto: CreateBulkPatrimonioDto = {
      patrimonios: [
        makeCreatePatrimonioDto({ codigo: 'PAT-001' }),
        makeCreatePatrimonioDto({ codigo: 'PAT-EXISTENTE' }),
      ],
    };

    const created1 = makePatrimonioEntity({ codigo: 'PAT-001' });
    const existing = makePatrimonioEntity({ codigo: 'PAT-EXISTENTE' });

    (queryRunner.manager!.findOne as jest.Mock)
      .mockResolvedValueOnce(null) // PAT-001 não existe
      .mockResolvedValueOnce(existing as Patrimonio); // PAT-EXISTENTE existe

    (queryRunner.manager!.create as jest.Mock).mockImplementation((_entity: any, data: any) => data);
    (queryRunner.manager!.save as jest.Mock).mockResolvedValueOnce(created1 as Patrimonio);

    const result = await service.createBulkWithTransaction(dto);

    expect(result.totalSucessos).toBe(1);
    expect(result.totalErros).toBe(1);
    expect(result.erros[0].erro).toBe('Código já existe');
  });
});
