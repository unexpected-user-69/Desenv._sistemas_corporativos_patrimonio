import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.findByNumeroSerie (unit)', () => {
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
      validateFile: jest.fn(),
      fileExists: jest.fn(),
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

  it('should return patrimonio by numeroSerie', async () => {
    const numeroSerie = 'DL123456';
    const patrimonio = makePatrimonioEntity({ numeroSerie });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.findByNumeroSerie(numeroSerie);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { numeroSerie },
    });
    expect(result).toBeDefined();
    expect(result.numeroSerie).toBe(numeroSerie);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const numeroSerie = 'INVALID123';

    repository.findOne.mockResolvedValue(null);

    await expect(service.findByNumeroSerie(numeroSerie)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.findByNumeroSerie(numeroSerie)).rejects.toThrow(
      `Patrimônio com número de série "${numeroSerie}" não encontrado`,
    );
  });
});
