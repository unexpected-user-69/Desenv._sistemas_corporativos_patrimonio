import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makeCreatePatrimonioDto, makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';

describe('PatrimonioService.create (unit)', () => {
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
          provide: UsersService,
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

  it('should create a patrimonio successfully', async () => {
    const dto = makeCreatePatrimonioDto();
    const entity = makePatrimonioEntity({
      codigo: dto.codigo,
      nome: dto.nome,
      descricao: dto.descricao,
      categoriaId: dto.categoriaId,
      status: dto.status,
      valorAquisicao: dto.valorAquisicao,
      dataAquisicao: dto.dataAquisicao ? new Date(dto.dataAquisicao) : undefined,
      dataGarantia: dto.dataGarantia ? new Date(dto.dataGarantia) : undefined,
      numeroSerie: dto.numeroSerie,
      modelo: dto.modelo,
      marca: dto.marca,
      localizacao: dto.localizacao,
      observacoes: dto.observacoes,
      fotoUrl: dto.fotoUrl,
      responsavelId: dto.responsavelId,
    });

    repository.findOne.mockResolvedValue(null); // Código não existe
    repository.create.mockReturnValue(entity as Patrimonio);
    repository.save.mockResolvedValue(entity as Patrimonio);

    const result = await service.create(dto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { codigo: dto.codigo },
    });
    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      codigo: entity.codigo,
      nome: entity.nome,
    });
  });

  it('should throw ConflictException if codigo already exists', async () => {
    const dto = makeCreatePatrimonioDto();
    const existingPatrimonio = makePatrimonioEntity({ codigo: dto.codigo });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { codigo: dto.codigo },
    });
    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });
});

