import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';

describe('PatrimonioService.validarCodigo (unit)', () => {
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
      fileExists: jest.fn(),
      validateFile: jest.fn(),
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

  it('should return disponivel: true when codigo does not exist', async () => {
    const codigo = 'PAT-NOVO-001';

    repository.findOne.mockResolvedValue(null);

    const result = await service.validarCodigo(codigo);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { codigo: codigo.toUpperCase() },
    });
    expect(result.disponivel).toBe(true);
  });

  it('should return disponivel: false when codigo exists', async () => {
    const codigo = 'PAT-EXISTENTE';
    const patrimonio = makePatrimonioEntity({ codigo });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.validarCodigo(codigo);

    expect(result.disponivel).toBe(false);
  });

  it('should convert codigo to uppercase', async () => {
    const codigo = 'pat-minusculo';

    repository.findOne.mockResolvedValue(null);

    await service.validarCodigo(codigo);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { codigo: 'PAT-MINUSCULO' },
    });
  });
});
