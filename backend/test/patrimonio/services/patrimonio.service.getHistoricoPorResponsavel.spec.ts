import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';
import { randomUUID } from 'crypto';

describe('PatrimonioService.getHistoricoPorResponsavel (unit)', () => {
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

  it('should return patrimonios by responsavel', async () => {
    const responsavelId = randomUUID();
    const patrimonios = [
      makePatrimonioEntity({ responsavelId }),
      makePatrimonioEntity({ responsavelId }),
    ];

    usersService.findOne!.mockResolvedValue({ id: responsavelId } as any);
    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.getHistoricoPorResponsavel(responsavelId);

    expect(usersService.findOne).toHaveBeenCalledWith(responsavelId);
    expect(repository.find).toHaveBeenCalledWith({
      where: { responsavelId },
      relations: ['categoria'],
      order: { nome: 'ASC' },
    });
    expect(result).toHaveLength(2);
  });

  it('should throw NotFoundException when responsavel not found', async () => {
    const responsavelId = randomUUID();

    usersService.findOne!.mockRejectedValue(
      new NotFoundException('Usuário não encontrado'),
    );

    await expect(
      service.getHistoricoPorResponsavel(responsavelId),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return empty array when no patrimonios found', async () => {
    const responsavelId = randomUUID();

    usersService.findOne!.mockResolvedValue({ id: responsavelId } as any);
    repository.find.mockResolvedValue([]);

    const result = await service.getHistoricoPorResponsavel(responsavelId);

    expect(result).toEqual([]);
  });
});
