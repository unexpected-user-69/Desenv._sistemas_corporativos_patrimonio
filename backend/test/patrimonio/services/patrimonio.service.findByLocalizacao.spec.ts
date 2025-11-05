import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.findByLocalizacao (unit)', () => {
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

  it('should return patrimonios by localizacao', async () => {
    const localizacao = 'Sala 205';
    const patrimonios = [
      makePatrimonioEntity({ localizacao: 'Sala 205 - Setor Financeiro' }),
      makePatrimonioEntity({ localizacao: 'Sala 205 - Setor Administrativo' }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findByLocalizacao(localizacao);

    expect(repository.find).toHaveBeenCalledWith({
      where: { localizacao: expect.anything() },
      order: { nome: 'ASC' },
      relations: ['categoria', 'responsavel'],
    });
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no patrimonios found', async () => {
    const localizacao = 'Sala Inexistente';

    repository.find.mockResolvedValue([]);

    const result = await service.findByLocalizacao(localizacao);

    expect(result).toEqual([]);
  });
});
