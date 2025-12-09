import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../../packages/patrimonio-service/src/patrimonio/services/storage.service';
import { PatrimonioStatus } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { randomUUID } from 'crypto';

describe('PatrimonioService.verificarDisponibilidade (unit)', () => {
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

  it('should return disponivel: true when patrimonio is ATIVO', async () => {
    const id = randomUUID();
    const patrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.ATIVO,
    });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.verificarDisponibilidade(id);

    expect(result.disponivel).toBe(true);
    expect(result.motivo).toBeUndefined();
  });

  it('should return disponivel: false when patrimonio is MANUTENCAO', async () => {
    const id = randomUUID();
    const patrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.MANUTENCAO,
    });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.verificarDisponibilidade(id);

    expect(result.disponivel).toBe(false);
    expect(result.motivo).toBe('PatrimÃƒÂ´nio em manutenÃƒÂ§ÃƒÂ£o');
  });

  it('should return disponivel: false when patrimonio is DESCARTADO', async () => {
    const id = randomUUID();
    const patrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.DESCARTADO,
    });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.verificarDisponibilidade(id);

    expect(result.disponivel).toBe(false);
    expect(result.motivo).toBe('PatrimÃƒÂ´nio descartado');
  });

  it('should return disponivel: false when patrimonio is INATIVO', async () => {
    const id = randomUUID();
    const patrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.INATIVO,
    });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.verificarDisponibilidade(id);

    expect(result.disponivel).toBe(false);
    expect(result.motivo).toContain('PatrimÃƒÂ´nio estÃƒÂ¡ com status:');
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.verificarDisponibilidade(id)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.verificarDisponibilidade(id)).rejects.toThrow(
      `PatrimÃƒÂ´nio com ID "${id}" nÃƒÂ£o encontrado`,
    );
  });
});
