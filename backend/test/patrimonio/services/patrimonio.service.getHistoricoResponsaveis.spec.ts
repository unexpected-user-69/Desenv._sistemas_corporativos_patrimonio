import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';
import { randomUUID } from 'crypto';

describe('PatrimonioService.getHistoricoResponsaveis (unit)', () => {
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

  it('should return historico responsaveis for patrimonio', async () => {
    const id = randomUUID();
    const responsavelId = randomUUID();
    const patrimonio = makePatrimonioEntity({
      id,
      responsavelId,
      createdAt: new Date('2024-01-01'),
      observacoes: 'ObservaÃ§Ãµes do patrimÃ´nio',
      responsavel: {
        id: responsavelId,
        name: 'ResponsÃ¡vel Teste',
      } as any,
    });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.getHistoricoResponsaveis(id);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result.patrimonioId).toBe(id);
    expect(result.responsaveis).toBeDefined();
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.getHistoricoResponsaveis(id)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getHistoricoResponsaveis(id)).rejects.toThrow(
      `Patrimônio com ID "${id}" não encontrado`,
    );
  });
});
