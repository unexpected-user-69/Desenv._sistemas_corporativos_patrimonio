import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';
import { QueryValorRangeDto } from '../../../src/patrimonio/dto/query-valor-range.dto';

describe('PatrimonioService.findByValorRange (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let storageService: Partial<StorageService>;
  let queryBuilder: any;

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

    queryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: () => ({
            ...repositoryMockFactory(),
            createQueryBuilder: jest.fn(() => queryBuilder),
          }),
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

  it('should return patrimonios by valor range', async () => {
    const dto: QueryValorRangeDto = {
      valorMinimo: 1000,
      valorMaximo: 5000,
    };
    const patrimonios = [
      makePatrimonioEntity({ valorAquisicao: 2000 }),
      makePatrimonioEntity({ valorAquisicao: 3500 }),
    ];

    queryBuilder.getMany.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findByValorRange(dto);

    expect(repository.createQueryBuilder).toHaveBeenCalledWith('patrimonio');
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('should throw BadRequestException when valorMinimo > valorMaximo', async () => {
    const dto: QueryValorRangeDto = {
      valorMinimo: 5000,
      valorMaximo: 1000,
    };

    await expect(service.findByValorRange(dto)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.findByValorRange(dto)).rejects.toThrow(
      'Valor mínimo deve ser menor ou igual ao valor máximo',
    );
  });

  it('should return empty array when no patrimonios found', async () => {
    const dto: QueryValorRangeDto = {
      valorMinimo: 10000,
      valorMaximo: 20000,
    };

    queryBuilder.getMany.mockResolvedValue([]);

    const result = await service.findByValorRange(dto);

    expect(result).toEqual([]);
  });
});
