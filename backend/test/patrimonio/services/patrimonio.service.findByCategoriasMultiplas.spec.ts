import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { QueryCategoriasMultiplasDto } from '../../../src/patrimonio/dto/query-categorias-multiplas.dto';
import { randomUUID } from 'crypto';

describe('PatrimonioService.findByCategoriasMultiplas (unit)', () => {
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

  it('should return patrimonios by multiple categorias', async () => {
    const categoriaId1 = randomUUID();
    const categoriaId2 = randomUUID();
    const dto: QueryCategoriasMultiplasDto = {
      categoriaIds: [categoriaId1, categoriaId2],
    };
    const patrimonios = [
      makePatrimonioEntity({ categoriaId: categoriaId1 }),
      makePatrimonioEntity({ categoriaId: categoriaId2 }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findByCategoriasMultiplas(dto);

    expect(repository.find).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no patrimonios found', async () => {
    const dto: QueryCategoriasMultiplasDto = {
      categoriaIds: [randomUUID()],
    };

    repository.find.mockResolvedValue([]);

    const result = await service.findByCategoriasMultiplas(dto);

    expect(result).toEqual([]);
  });
});
