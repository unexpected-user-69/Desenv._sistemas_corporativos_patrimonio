import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio, PatrimonioStatus } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UpdateStatusPatrimonioDto } from '../../../../packages/patrimonio-service/src/patrimonio/dto/update-status-patrimonio.dto';
import { UsersHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.updateStatus (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;
  let storageService: Partial<StorageService>;

  beforeEach(async () => {
    usersHttpClient = {
      findOne: jest.fn(),
    };

    categoriasHttpClient = {
      findOne: jest.fn(),
    };

    storageService = {
      saveFile: jest.fn(),
      deleteFile: jest.fn(),
      validateFile: jest.fn(),
      fileExists: jest.fn(),
    };

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
          useValue: usersHttpClient,
        },
        {
          provide: CategoriasHttpClient,
          useValue: categoriasHttpClient,
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
          useValue: storageService,
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should update status successfully', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });
    const updateDto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.MANUTENCAO,
      observacoes: 'Enviado para manutenÃƒÂ§ÃƒÂ£o preventiva',
    };
    const updatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      status: PatrimonioStatus.MANUTENCAO,
      observacoes: 'Enviado para manutenÃƒÂ§ÃƒÂ£o preventiva',
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.updateStatus(patrimonioId, updateDto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.MANUTENCAO,
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();
    const updateDto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.MANUTENCAO,
    };

    repository.findOne.mockResolvedValue(null);

    await expect(service.updateStatus(patrimonioId, updateDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when status is already the same', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.MANUTENCAO,
    });
    const updateDto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.MANUTENCAO,
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);

    await expect(service.updateStatus(patrimonioId, updateDto)).rejects.toThrow(
      BadRequestException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should update status without observacoes', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      status: PatrimonioStatus.ATIVO,
    });
    const updateDto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.DESCARTADO,
    };
    const updatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      status: PatrimonioStatus.DESCARTADO,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.updateStatus(patrimonioId, updateDto);

    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.DESCARTADO,
    });
  });
});

