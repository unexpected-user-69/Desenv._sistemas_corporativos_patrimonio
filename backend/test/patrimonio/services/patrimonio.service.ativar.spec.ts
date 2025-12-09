import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio, PatrimonioStatus } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UsersHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.ativar (unit)', () => {
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

  it('should activate patrimonio successfully', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.INATIVO,
    });
    const activatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      status: PatrimonioStatus.ATIVO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(activatedPatrimonio as Patrimonio);

    const result = await service.ativar(patrimonioId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: PatrimonioStatus.ATIVO,
      }),
    );
    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.ativar(patrimonioId)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when patrimonio is already active', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);

    await expect(service.ativar(patrimonioId)).rejects.toThrow(
      BadRequestException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should activate patrimonio from MANUTENCAO status', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.MANUTENCAO,
    });
    const activatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      status: PatrimonioStatus.ATIVO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(activatedPatrimonio as Patrimonio);

    const result = await service.ativar(patrimonioId);

    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });
  });
});
