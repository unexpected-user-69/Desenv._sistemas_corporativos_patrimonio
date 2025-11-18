import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { StorageService } from '../../../src/patrimonio/services/storage.service';

describe('PatrimonioService.findByNumeroSerie (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let storageService: Partial<StorageService>;

  beforeEach(async () => {
    usersService = {
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

  it('should return patrimonio by numeroSerie', async () => {
    const numeroSerie = 'DL123456';
    const patrimonio = makePatrimonioEntity({ numeroSerie });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.findByNumeroSerie(numeroSerie);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { numeroSerie },
      relations: ['categoria', 'responsavel'],
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
