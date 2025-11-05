import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { randomUUID } from 'crypto';

describe('PatrimonioService.getHistoricoResponsaveis (unit)', () => {
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

  it('should return historico responsaveis for patrimonio', async () => {
    const id = randomUUID();
    const responsavelId = randomUUID();
    const patrimonio = makePatrimonioEntity({
      id,
      responsavelId,
      createdAt: new Date('2024-01-01'),
      observacoes: 'Observações do patrimônio',
      responsavel: {
        id: responsavelId,
        name: 'Responsável Teste',
      } as any,
    });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.getHistoricoResponsaveis(id);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['responsavel'],
    });
    expect(result.patrimonioId).toBe(id);
    expect(result.responsaveis).toBeDefined();
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.getHistoricoResponsaveis(id)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getHistoricoResponsaveis(id)).rejects.toThrow(
      `Patrimônio com ID "${id}" não encontrado`,
    );
  });
});
