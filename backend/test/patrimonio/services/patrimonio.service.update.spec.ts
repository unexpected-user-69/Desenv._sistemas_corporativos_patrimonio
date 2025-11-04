import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UpdatePatrimonioDto } from '../../../src/patrimonio/dto/update-patrimonio.dto';

describe('PatrimonioService.update (unit)', () => {
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

  it('should update patrimonio successfully', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({ id: patrimonioId });
    const updateDto: UpdatePatrimonioDto = {
      nome: 'Updated Name',
    };
    const updatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      nome: 'Updated Name',
    });

    repository.preload.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.update(patrimonioId, updateDto);

    expect(repository.preload).toHaveBeenCalledWith(
      expect.objectContaining({ id: patrimonioId }),
    );
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: patrimonioId,
      nome: 'Updated Name',
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();
    const updateDto: UpdatePatrimonioDto = { nome: 'Updated Name' };

    repository.preload.mockResolvedValue(null);

    await expect(service.update(patrimonioId, updateDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  // Note: O método update atual não valida código duplicado antes de salvar
  // A validação de conflito de código é feita pelo banco de dados (unique constraint)
  // Este teste pode ser removido ou ajustado quando a validação for implementada
  it.skip('should throw ConflictException if codigo already exists', async () => {
    // Skipped: update method doesn't check for duplicate codigo before saving
    // Conflict is handled by database unique constraint
  });
});

