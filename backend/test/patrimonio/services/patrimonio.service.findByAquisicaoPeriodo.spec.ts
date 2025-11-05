import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { QueryAquisicaoPeriodoDto } from '../../../src/patrimonio/dto/query-aquisicao-periodo.dto';

describe('PatrimonioService.findByAquisicaoPeriodo (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
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
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should return patrimonios by aquisicao periodo', async () => {
    const dto: QueryAquisicaoPeriodoDto = {
      dataInicial: '2024-01-01',
      dataFinal: '2024-12-31',
    };
    const patrimonios = [
      makePatrimonioEntity({ dataAquisicao: new Date('2024-06-15') }),
      makePatrimonioEntity({ dataAquisicao: new Date('2024-08-20') }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findByAquisicaoPeriodo(dto);

    expect(repository.find).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('should throw BadRequestException when dataInicial > dataFinal', async () => {
    const dto: QueryAquisicaoPeriodoDto = {
      dataInicial: '2024-12-31',
      dataFinal: '2024-01-01',
    };

    await expect(service.findByAquisicaoPeriodo(dto)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.findByAquisicaoPeriodo(dto)).rejects.toThrow(
      'Data inicial deve ser anterior ou igual à data final',
    );
  });

  it('should return empty array when no patrimonios found', async () => {
    const dto: QueryAquisicaoPeriodoDto = {
      dataInicial: '2024-01-01',
      dataFinal: '2024-12-31',
    };

    repository.find.mockResolvedValue([]);

    const result = await service.findByAquisicaoPeriodo(dto);

    expect(result).toEqual([]);
  });
});
