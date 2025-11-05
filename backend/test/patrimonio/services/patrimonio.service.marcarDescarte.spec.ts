import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio, PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { DescartePatrimonioDto } from '../../../src/patrimonio/dto/descarte-patrimonio.dto';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.marcarDescarte (unit)', () => {
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

  it('should mark patrimonio for disposal successfully', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
      observacoes: 'Observações anteriores',
    });
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
      destinoDescarte: 'Leilão público',
    };

    const disposedPatrimonio = {
      ...existingPatrimonio,
      status: PatrimonioStatus.DESCARTADO,
      observacoes: expect.stringContaining('[Descarte'),
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(disposedPatrimonio as Patrimonio);

    const result = await service.marcarDescarte(patrimonioId, dto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: PatrimonioStatus.DESCARTADO,
      }),
    );
    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.DESCARTADO,
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
    };

    repository.findOne.mockResolvedValue(null);

    await expect(service.marcarDescarte(patrimonioId, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should mark patrimonio without destinoDescarte', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
    };

    const disposedPatrimonio = {
      ...existingPatrimonio,
      status: PatrimonioStatus.DESCARTADO,
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(disposedPatrimonio as Patrimonio);

    const result = await service.marcarDescarte(patrimonioId, dto);

    expect(result.status).toBe(PatrimonioStatus.DESCARTADO);
  });

  it('should preserve existing observacoes when marking for disposal', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
      observacoes: 'Observações anteriores importantes',
    });
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockImplementation((patrimonio) => Promise.resolve(patrimonio as Patrimonio));

    await service.marcarDescarte(patrimonioId, dto);

    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        observacoes: expect.stringContaining('Observações anteriores importantes'),
      }),
    );
  });
});
