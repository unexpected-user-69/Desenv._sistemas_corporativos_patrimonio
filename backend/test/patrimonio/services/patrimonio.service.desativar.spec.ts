import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio, PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.desativar (unit)', () => {
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

  it('should deactivate patrimonio successfully', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });
    const deactivatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      status: PatrimonioStatus.INATIVO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(deactivatedPatrimonio as Patrimonio);

    const result = await service.desativar(patrimonioId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: PatrimonioStatus.INATIVO,
      }),
    );
    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.INATIVO,
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.desativar(patrimonioId)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when patrimonio is already inactive', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.INATIVO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);

    await expect(service.desativar(patrimonioId)).rejects.toThrow(
      BadRequestException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should deactivate patrimonio from MANUTENCAO status', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.MANUTENCAO,
    });
    const deactivatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      status: PatrimonioStatus.INATIVO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(deactivatedPatrimonio as Patrimonio);

    const result = await service.desativar(patrimonioId);

    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.INATIVO,
    });
  });
});
