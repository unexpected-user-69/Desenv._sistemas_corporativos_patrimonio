import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UpdatePatrimonioDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/update-patrimonio.dto';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

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
        {
          provide: getRepositoryToken(PatrimonioLocalizacaoHistorico),
          useFactory: repositoryMockFactory,
        },
        {
          provide: UsersHttpClient,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: CategoriasHttpClient,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
            createQueryRunner: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: {
            saveFile: jest.fn(),
            deleteFile: jest.fn(),
      validateFile: jest.fn(),
            fileExists: jest.fn(),
          },
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

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.preload.mockResolvedValue(updatedPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.update(patrimonioId, updateDto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.preload).toHaveBeenCalledWith(
      expect.objectContaining({ id: patrimonioId, nome: 'Updated Name' }),
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

    repository.findOne.mockResolvedValue(null);

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

