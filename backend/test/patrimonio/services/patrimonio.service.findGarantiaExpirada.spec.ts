import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.findGarantiaExpirada (unit)', () => {
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

  it('should return patrimonios with expired garantia', async () => {
    const dias = 30;
    const patrimonios = [
      makePatrimonioEntity({
        dataGarantia: new Date('2023-01-01'),
      }),
      makePatrimonioEntity({
        dataGarantia: new Date('2023-06-15'),
      }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findGarantiaExpirada(dias);

    expect(repository.find).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it('should use default dias = 0 when not provided', async () => {
    const patrimonios = [
      makePatrimonioEntity({
        dataGarantia: new Date('2020-01-01'),
      }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.findGarantiaExpirada();

    expect(result).toHaveLength(1);
  });

  it('should return empty array when no patrimonios found', async () => {
    repository.find.mockResolvedValue([]);

    const result = await service.findGarantiaExpirada(30);

    expect(result).toEqual([]);
  });
});
