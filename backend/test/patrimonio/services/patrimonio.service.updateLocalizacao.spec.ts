import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UpdateLocalizacaoPatrimonioDto } from '../../../../packages/patrimonio-service/src/patrimonio/dto/update-localizacao-patrimonio.dto';
import { UsersHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.updateLocalizacao (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let categoriasHttpClient: Partial<CategoriasHttpClient>;

  beforeEach(async () => {
    usersHttpClient = {
      findOne: jest.fn(),
    };

    categoriasHttpClient = {
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

  it('should update localizacao successfully', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      localizacao: 'Sala 101',
    });
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205 - Setor Financeiro',
    };
    const updatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      localizacao: dto.localizacao,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.updateLocalizacao(patrimonioId, dto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: patrimonioId,
      localizacao: dto.localizacao,
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205',
    };

    repository.findOne.mockResolvedValue(null);

    await expect(service.updateLocalizacao(patrimonioId, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should update localizacao with observacoes', async () => {
    const patrimonioId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      localizacao: 'Sala 101',
    });
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205',
      observacoes: 'MudanÃƒÂ§a de setor',
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockImplementation((patrimonio) => Promise.resolve(patrimonio as Patrimonio));

    await service.updateLocalizacao(patrimonioId, dto);

    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        localizacao: dto.localizacao,
      }),
    );
  });
});
