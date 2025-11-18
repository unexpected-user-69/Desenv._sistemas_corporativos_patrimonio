import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio, PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { DescartePatrimonioDto } from '../../../src/patrimonio/dto/descarte-patrimonio.dto';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';

describe('PatrimonioService.marcarDescarte (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let storageService: Partial<StorageService>;

  beforeEach(async () => {
    usersService = {
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
        {
          provide: StorageService,
          useValue: storageService,
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

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    // O serviço modifica o objeto diretamente (patrimonio.status e patrimonio.observacoes)
    // e depois chama save. O mock deve retornar o objeto modificado completo
    repository.save.mockImplementation((patrimonio: any) => {
      // Garantir que todos os campos obrigatórios estão presentes
      // O serviço modifica status e observacoes, então preservamos essas mudanças
      const saved: Patrimonio = {
        ...existingPatrimonio,
        ...patrimonio,
        // Garantir campos obrigatórios
        id: patrimonio.id || existingPatrimonio.id || patrimonioId,
        codigo: patrimonio.codigo || existingPatrimonio.codigo || 'PAT-001',
        nome: patrimonio.nome || existingPatrimonio.nome || 'Test',
        status: patrimonio.status || PatrimonioStatus.DESCARTADO,
        // Observacoes foi modificado pelo serviço
        observacoes: patrimonio.observacoes,
        createdAt: patrimonio.createdAt || existingPatrimonio.createdAt || new Date(),
        updatedAt: patrimonio.updatedAt || new Date(),
        version: patrimonio.version ?? existingPatrimonio.version ?? 1,
      } as Patrimonio;
      return Promise.resolve(saved);
    });

    const result = await service.marcarDescarte(patrimonioId, dto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: patrimonioId },
    });
    expect(repository.save).toHaveBeenCalled();
    
    // Verificar que as observações foram atualizadas corretamente
    const saveCall = repository.save.mock.calls[0][0];
    expect(saveCall.status).toBe(PatrimonioStatus.DESCARTADO);
    expect(String(saveCall.observacoes || '')).toContain('[Descarte');
    expect(String(saveCall.observacoes || '')).toContain('Observações anteriores');
    expect(String(saveCall.observacoes || '')).toContain('Equipamento obsoleto');
    expect(String(saveCall.observacoes || '')).toContain('Leilão público');
    
    expect(result).toMatchObject({
      id: patrimonioId,
      status: PatrimonioStatus.DESCARTADO,
    });
    expect(result.observacoes).toBeDefined();
    if (result.observacoes) {
      expect(result.observacoes).toContain('[Descarte');
      expect(result.observacoes).toContain('Observações anteriores');
    }
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

    repository.findOne.mockResolvedValue(existingPatrimonio as Patrimonio);
    repository.save.mockImplementation((patrimonio: any) => {
      const saved: Patrimonio = {
        ...existingPatrimonio,
        ...patrimonio,
        id: patrimonio.id || existingPatrimonio.id || patrimonioId,
        codigo: patrimonio.codigo || existingPatrimonio.codigo || 'PAT-001',
        nome: patrimonio.nome || existingPatrimonio.nome || 'Test',
        status: patrimonio.status || PatrimonioStatus.DESCARTADO,
        observacoes: patrimonio.observacoes,
        createdAt: patrimonio.createdAt || existingPatrimonio.createdAt || new Date(),
        updatedAt: patrimonio.updatedAt || new Date(),
        version: patrimonio.version ?? existingPatrimonio.version ?? 1,
      } as Patrimonio;
      return Promise.resolve(saved);
    });

    const result = await service.marcarDescarte(patrimonioId, dto);

    expect(result.status).toBe(PatrimonioStatus.DESCARTADO);
    expect(result.observacoes).toBeDefined();
    if (result.observacoes) {
      expect(result.observacoes).toContain('[Descarte');
      expect(result.observacoes).toContain('Equipamento obsoleto');
    }
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
    repository.save.mockImplementation((patrimonio: any) => {
      const saved: Patrimonio = {
        ...existingPatrimonio,
        ...patrimonio,
        id: patrimonio.id || existingPatrimonio.id || patrimonioId,
        codigo: patrimonio.codigo || existingPatrimonio.codigo || 'PAT-001',
        nome: patrimonio.nome || existingPatrimonio.nome || 'Test',
        status: patrimonio.status || PatrimonioStatus.DESCARTADO,
        observacoes: patrimonio.observacoes,
        createdAt: patrimonio.createdAt || existingPatrimonio.createdAt || new Date(),
        updatedAt: patrimonio.updatedAt || new Date(),
        version: patrimonio.version ?? existingPatrimonio.version ?? 1,
      } as Patrimonio;
      return Promise.resolve(saved);
    });

    await service.marcarDescarte(patrimonioId, dto);

    expect(repository.save).toHaveBeenCalled();
    const saveCall = repository.save.mock.calls[0][0];
    expect(saveCall.observacoes).toBeDefined();
    expect(String(saveCall.observacoes || '')).toContain('Observações anteriores importantes');
  });
});
