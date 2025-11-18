import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Response } from 'express';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { QueryPatrimonioDto } from '../../../src/patrimonio/dto/query-patrimonio.dto';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';

describe('PatrimonioService.gerarRelatorioInventario (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let storageService: Partial<StorageService>;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    storageService = {
      saveFile: jest.fn(),
      deleteFile: jest.fn(),
      fileExists: jest.fn(),
      validateFile: jest.fn(),
    };

    mockResponse = {
      setHeader: jest.fn().mockReturnThis(),
      send: jest.fn(),
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

  it('should generate inventario report successfully', async () => {
    const query: QueryPatrimonioDto = {};
    const patrimonios = [makePatrimonioEntity()];

    repository.findAndCount.mockResolvedValue([patrimonios as Patrimonio[], 1]);
    repository.findOne.mockResolvedValue(patrimonios[0] as Patrimonio);

    await service.gerarRelatorioInventario(query, mockResponse as Response);

    expect(mockResponse.setHeader).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it('should handle query filters in report', async () => {
    const query: QueryPatrimonioDto = { status: PatrimonioStatus.ATIVO };

    repository.findAndCount.mockResolvedValue([[], 0]);

    await service.gerarRelatorioInventario(query, mockResponse as Response);

    expect(repository.findAndCount).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
