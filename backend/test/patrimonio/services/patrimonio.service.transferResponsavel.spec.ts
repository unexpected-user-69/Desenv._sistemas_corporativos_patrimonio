import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { TransferirResponsavelDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/transferir-responsavel.dto';
import { UsersHttpClient } from '../../../packages/patrimonio-service/src/http-clients/users-http-client';
import { CategoriasHttpClient } from '../../../packages/patrimonio-service/src/http-clients/categorias-http-client';
import { PatrimonioLocalizacaoHistorico } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { StorageService } from '../../../packages/patrimonio-service/src/patrimonio/services/storage.service';
import { UserResponseDto } from '../../../src/users/dto/user-response.dto';

describe('PatrimonioService.transferResponsavel (unit)', () => {
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

  it('should transfer responsavel successfully', async () => {
    const patrimonioId = randomUUID();
    const novoResponsavelId = randomUUID();
    const responsavelAtualId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      responsavelId: responsavelAtualId,
    });
    const updateDto: TransferirResponsavelDto = {
      novoResponsavelId,
      observacoes: 'TransferÃªncia de setor',
    };
    const novoResponsavel: Partial<UserResponseDto> = {
      id: novoResponsavelId,
      name: 'Novo ResponsÃ¡vel',
    };
    const updatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      responsavelId: novoResponsavelId,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    (usersHttpClient.findOne as jest.Mock).mockResolvedValue(novoResponsavel);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.transferResponsavel(patrimonioId, updateDto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(usersHttpClient.findOne).toHaveBeenCalledWith(novoResponsavelId);
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: patrimonioId,
      responsavelId: novoResponsavelId,
    });
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const patrimonioId = randomUUID();
    const updateDto: TransferirResponsavelDto = {
      novoResponsavelId: randomUUID(),
    };

    repository.findOne.mockResolvedValue(null);

    await expect(
      service.transferResponsavel(patrimonioId, updateDto),
    ).rejects.toThrow(NotFoundException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when novo responsavel not found', async () => {
    const patrimonioId = randomUUID();
    const novoResponsavelId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
    });
    const updateDto: TransferirResponsavelDto = {
      novoResponsavelId,
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    (usersHttpClient.findOne as jest.Mock).mockRejectedValue(
      new NotFoundException(`User with ID "${novoResponsavelId}" not found`),
    );

    await expect(
      service.transferResponsavel(patrimonioId, updateDto),
    ).rejects.toThrow(NotFoundException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException when same responsavel', async () => {
    const patrimonioId = randomUUID();
    const responsavelId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      responsavelId,
    });
    const updateDto: TransferirResponsavelDto = {
      novoResponsavelId: responsavelId,
    };
    const responsavel: Partial<UserResponseDto> = {
      id: responsavelId,
      name: 'ResponsÃ¡vel',
    };

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    (usersHttpClient.findOne as jest.Mock).mockResolvedValue(responsavel);

    await expect(
      service.transferResponsavel(patrimonioId, updateDto),
    ).rejects.toThrow(BadRequestException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should transfer responsavel without observacoes', async () => {
    const patrimonioId = randomUUID();
    const novoResponsavelId = randomUUID();
    const responsavelAtualId = randomUUID();
    const existingPatrimonio = makePatrimonioEntity({
      id: patrimonioId,
      responsavelId: responsavelAtualId,
    });
    const updateDto: TransferirResponsavelDto = {
      novoResponsavelId,
    };
    const novoResponsavel: Partial<UserResponseDto> = {
      id: novoResponsavelId,
      name: 'Novo ResponsÃ¡vel',
    };
    const updatedPatrimonio = makePatrimonioEntity({
      ...existingPatrimonio,
      responsavelId: novoResponsavelId,
    });

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    (usersHttpClient.findOne as jest.Mock).mockResolvedValue(novoResponsavel);
    repository.save.mockResolvedValue(updatedPatrimonio as Patrimonio);

    const result = await service.transferResponsavel(patrimonioId, updateDto);

    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: patrimonioId,
      responsavelId: novoResponsavelId,
    });
  });
});

