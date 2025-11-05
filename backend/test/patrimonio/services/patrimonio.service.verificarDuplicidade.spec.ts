import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { VerificarDuplicidadeDto } from '../../../src/patrimonio/dto/verificar-duplicidade.dto';

describe('PatrimonioService.verificarDuplicidade (unit)', () => {
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

  it('should return duplicatas by numeroSerie', async () => {
    const dto: VerificarDuplicidadeDto = {
      numeroSerie: 'DL123456',
    };
    const patrimonios = [
      makePatrimonioEntity({ numeroSerie: 'DL123456' }),
      makePatrimonioEntity({ numeroSerie: 'DL123456' }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.verificarDuplicidade(dto);

    expect(repository.find).toHaveBeenCalled();
    expect(result.duplicatas).toHaveLength(2);
    expect(result.total).toBe(2);
  });

  it('should return duplicatas by modelo and marca', async () => {
    const dto: VerificarDuplicidadeDto = {
      modelo: 'Inspiron 15',
      marca: 'Dell',
    };
    const patrimonios = [
      makePatrimonioEntity({ modelo: 'Inspiron 15', marca: 'Dell' }),
    ];

    repository.find.mockResolvedValue(patrimonios as Patrimonio[]);

    const result = await service.verificarDuplicidade(dto);

    expect(result.duplicatas).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('should throw BadRequestException when no fields provided', async () => {
    const dto: VerificarDuplicidadeDto = {};

    await expect(service.verificarDuplicidade(dto)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.verificarDuplicidade(dto)).rejects.toThrow(
      'Deve informar pelo menos um campo (numeroSerie, modelo ou marca)',
    );
  });

  it('should return empty array when no duplicatas found', async () => {
    const dto: VerificarDuplicidadeDto = {
      numeroSerie: 'INEXISTENTE',
    };

    repository.find.mockResolvedValue([]);

    const result = await service.verificarDuplicidade(dto);

    expect(result.duplicatas).toEqual([]);
    expect(result.total).toBe(0);
  });
});
