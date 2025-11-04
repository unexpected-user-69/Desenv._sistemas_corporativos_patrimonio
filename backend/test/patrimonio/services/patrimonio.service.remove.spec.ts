import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';

describe('PatrimonioService.remove (unit)', () => {
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

  it('should remove patrimonio successfully', async () => {
    const patrimonioId = randomUUID();
    const entity = makePatrimonioEntity({ id: patrimonioId });

    repository.findOne.mockResolvedValue(entity as Patrimonio);
    repository.softDelete.mockResolvedValue({ affected: 1, raw: [] } as any);

    await service.remove(patrimonioId);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.softDelete).toHaveBeenCalledWith(patrimonioId);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();

    repository.findOne.mockResolvedValue(null);

    await expect(service.remove(patrimonioId)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.softDelete).not.toHaveBeenCalled();
  });
});

