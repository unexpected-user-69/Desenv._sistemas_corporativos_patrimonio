import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';

describe('PatrimonioService.getDashboard (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let storageService: Partial<StorageService>;
  let queryBuilder: {
    select: jest.Mock;
    addSelect: jest.Mock;
    where: jest.Mock;
    andWhere: jest.Mock;
    groupBy: jest.Mock;
    getRawOne: jest.Mock;
    getRawMany: jest.Mock;
  };

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
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
      getRawMany: jest.fn(),
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
    repository.createQueryBuilder = jest.fn(() => queryBuilder) as any;
  });

  it('should return dashboard metrics successfully', async () => {
    const total = 1000;
    const valorTotal = 5000000;
    const porStatus = [
      { status: 'ATIVO', count: '800' },
      { status: 'MANUTENCAO', count: '50' },
      { status: 'DESCARTADO', count: '150' },
    ];
    const porCategoria = [
      { categoriaId: 'cat-1', count: '300' },
      { categoriaId: 'cat-2', count: '200' },
    ];
    const garantiasVencendo = 15;
    const emManutencao = 8;
    const novosUltimoMes = 25;

    repository.count
      .mockResolvedValueOnce(total) // Total de patrimônios
      .mockResolvedValueOnce(garantiasVencendo) // Garantias vencendo
      .mockResolvedValueOnce(emManutencao) // Em manutenção
      .mockResolvedValueOnce(novosUltimoMes); // Novos no último mês

    queryBuilder.getRawOne.mockResolvedValue({ total: valorTotal.toString() });
    queryBuilder.getRawMany
      .mockResolvedValueOnce(porStatus) // Por status
      .mockResolvedValueOnce(porCategoria); // Por categoria

    const result = await service.getDashboard();

    expect(result).toEqual({
      total,
      valorTotal,
      porStatus: {
        ATIVO: 800,
        MANUTENCAO: 50,
        DESCARTADO: 150,
      },
      porCategoria: {
        'cat-1': 300,
        'cat-2': 200,
      },
      garantiasVencendo,
      emManutencao,
      novosUltimoMes,
    });
  });

  it('should return zero values when no data exists', async () => {
    repository.count.mockResolvedValue(0);
    queryBuilder.getRawOne.mockResolvedValue({ total: null });
    queryBuilder.getRawMany.mockResolvedValue([]);

    const result = await service.getDashboard();

    expect(result).toEqual({
      total: 0,
      valorTotal: 0,
      porStatus: {},
      porCategoria: {},
      garantiasVencendo: 0,
      emManutencao: 0,
      novosUltimoMes: 0,
    });
  });

  it('should handle null valorTotal', async () => {
    repository.count.mockResolvedValue(10);
    queryBuilder.getRawOne.mockResolvedValue({ total: null });
    queryBuilder.getRawMany.mockResolvedValue([]);

    const result = await service.getDashboard();

    expect(result.valorTotal).toBe(0);
  });
});

