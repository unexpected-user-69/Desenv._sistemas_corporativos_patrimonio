import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { QueryPatrimonioDto } from '../../../src/patrimonio/dto/query-patrimonio.dto';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioService.findAllWithFilters (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should return paginated patrimonios with default filters', async () => {
    const patrimonios = [
      makePatrimonioEntity({ nome: 'Patrimônio 1' }),
      makePatrimonioEntity({ nome: 'Patrimônio 2' }),
    ];

    repository.findAndCount.mockResolvedValue([patrimonios as Patrimonio[], 2]);

    const query: QueryPatrimonioDto = {};
    const result = await service.findAllWithFilters(query);

    expect(repository.findAndCount).toHaveBeenCalled();
    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
  });

  it('should apply filters correctly', async () => {
    const patrimonios = [makePatrimonioEntity({ status: PatrimonioStatus.ATIVO })];
    
    repository.findAndCount.mockResolvedValue([patrimonios as Patrimonio[], 1]);

    const query: QueryPatrimonioDto = {
      status: PatrimonioStatus.ATIVO,
      page: 1,
      limit: 10,
    };

    const result = await service.findAllWithFilters(query);

    expect(repository.findAndCount).toHaveBeenCalled();
    expect(result.data).toHaveLength(1);
    expect(result.page).toBe(1);
  });

  it('should handle search query', async () => {
    const patrimonios = [makePatrimonioEntity({ nome: 'Notebook' })];
    
    repository.findAndCount.mockResolvedValue([patrimonios as Patrimonio[], 1]);

    const query: QueryPatrimonioDto = {
      q: 'notebook',
      page: 1,
      limit: 10,
    };

    const result = await service.findAllWithFilters(query);

    expect(repository.findAndCount).toHaveBeenCalled();
    expect(result.data).toHaveLength(1);
  });

  it('should return empty array when no patrimonios found', async () => {
    repository.findAndCount.mockResolvedValue([[], 0]);

    const query: QueryPatrimonioDto = {};
    const result = await service.findAllWithFilters(query);

    expect(result.data).toEqual([]);
    expect(result.total).toBe(0);
  });
});

