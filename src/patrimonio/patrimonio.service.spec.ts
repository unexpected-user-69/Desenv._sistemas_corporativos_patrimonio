import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { PatrimonioService } from './patrimonio.service';
import { Patrimonio, PatrimonioStatus, PatrimonioCategoria } from './entities/patrimonio.entity';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { createRepositoryMock } from '../../test/mocks/repository.mock';

describe('PatrimonioService', () => {
  let service: PatrimonioService;
  let repository: jest.Mocked<Repository<Patrimonio>>;

  const mockPatrimonio: Patrimonio = {
    id: 'patrimonio-1',
    codigo: 'PAT-2024-001',
    nome: 'Notebook Dell Inspiron 15',
    descricao: 'Notebook para uso administrativo',
    categoria: PatrimonioCategoria.EQUIPAMENTO,
    status: PatrimonioStatus.ATIVO,
    marca: 'Dell',
    modelo: 'Inspiron 15 3000',
    numeroSerie: 'ABC123456789',
    valorAquisicao: 2500.00,
    dataAquisicao: new Date('2024-01-15'),
    dataGarantia: new Date('2025-01-15'),
    localizacao: 'Sala 101',
    responsavelId: 'user-1',
    observacoes: 'Equipamento em perfeito estado',
    fotoUrl: 'https://example.com/foto.jpg',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    version: 1,
  } as Patrimonio;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useValue: createRepositoryMock<Patrimonio>(),
        },
      ],
    }).compile();

    service = module.get<PatrimonioService>(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a patrimonio by id', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockPatrimonio);

      // Act
      const result = await service.findOne('patrimonio-1');

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'patrimonio-1' } });
      expect(result).toMatchObject({
        id: mockPatrimonio.id,
        codigo: mockPatrimonio.codigo,
        nome: mockPatrimonio.nome,
        categoria: mockPatrimonio.categoria,
        status: mockPatrimonio.status,
      });
    });

    it('should throw NotFoundException when patrimonio not found', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne('non-existent')).rejects.toThrow(
        new NotFoundException('Patrimônio com ID "non-existent" não encontrado'),
      );
    });
  });

  describe('findByCodigo', () => {
    it('should return a patrimonio by codigo', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockPatrimonio);

      // Act
      const result = await service.findByCodigo('PAT-2024-001');

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { codigo: 'PAT-2024-001' } });
      expect(result).toMatchObject({
        id: mockPatrimonio.id,
        codigo: mockPatrimonio.codigo,
        nome: mockPatrimonio.nome,
      });
    });

    it('should throw NotFoundException when patrimonio not found by codigo', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findByCodigo('NON-EXISTENT')).rejects.toThrow(
        new NotFoundException('Patrimônio com código "NON-EXISTENT" não encontrado'),
      );
    });
  });

  describe('create', () => {
    const createDto: CreatePatrimonioDto = {
      codigo: 'PAT-2024-002',
      nome: 'Monitor Dell 24"',
      descricao: 'Monitor para uso administrativo',
      categoria: PatrimonioCategoria.EQUIPAMENTO,
      status: PatrimonioStatus.ATIVO,
      marca: 'Dell',
      modelo: 'P2419H',
      valorAquisicao: 800.00,
      dataAquisicao: '2024-02-01',
      localizacao: 'Sala 102',
    };

    it('should create a new patrimonio', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(null); // No existing patrimonio
      repository.create.mockReturnValue(mockPatrimonio as any);
      repository.save.mockResolvedValue(mockPatrimonio);

      // Act
      const result = await service.create(createDto);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { codigo: createDto.codigo } });
      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        dataAquisicao: new Date(createDto.dataAquisicao!),
        dataGarantia: undefined,
      });
      expect(repository.save).toHaveBeenCalledWith(mockPatrimonio);
      expect(result).toMatchObject({
        id: mockPatrimonio.id,
        codigo: mockPatrimonio.codigo,
        nome: mockPatrimonio.nome,
      });
    });

    it('should throw ConflictException when codigo already exists', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockPatrimonio);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException('Código de patrimônio já existe'),
      );
    });

    it('should handle database constraint violation', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(mockPatrimonio as any);
      const error = new Error('Duplicate key');
      (error as any).code = '23505';
      repository.save.mockRejectedValue(error);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException('Código de patrimônio já existe'),
      );
    });
  });

  describe('update', () => {
    const updateDto: UpdatePatrimonioDto = {
      nome: 'Notebook Dell Inspiron 15 - Atualizado',
      valorAquisicao: 2800.00,
    };

    it('should update a patrimonio', async () => {
      // Arrange
      const updatedPatrimonio = { ...mockPatrimonio, ...updateDto };
      repository.preload.mockResolvedValue(updatedPatrimonio as any);
      repository.save.mockResolvedValue(updatedPatrimonio as any);

      // Act
      const result = await service.update('patrimonio-1', updateDto);

      // Assert
      expect(repository.preload).toHaveBeenCalledWith({
        id: 'patrimonio-1',
        ...updateDto,
        dataAquisicao: undefined,
        dataGarantia: undefined,
      });
      expect(repository.save).toHaveBeenCalledWith(updatedPatrimonio);
      expect(result).toMatchObject({
        id: mockPatrimonio.id,
        nome: updateDto.nome,
        valorAquisicao: updateDto.valorAquisicao,
      });
    });

    it('should throw NotFoundException when patrimonio not found for update', async () => {
      // Arrange
      repository.preload.mockResolvedValue(undefined);

      // Act & Assert
      await expect(service.update('non-existent', updateDto)).rejects.toThrow(
        new NotFoundException('Patrimônio com ID "non-existent" não encontrado'),
      );
    });
  });

  describe('remove', () => {
    it('should soft delete a patrimonio', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(mockPatrimonio);
      repository.softDelete.mockResolvedValue({ affected: 1 } as any);

      // Act
      await service.remove('patrimonio-1');

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'patrimonio-1' } });
      expect(repository.softDelete).toHaveBeenCalledWith('patrimonio-1');
    });

    it('should throw NotFoundException when patrimonio not found for removal', async () => {
      // Arrange
      repository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove('non-existent')).rejects.toThrow(
        new NotFoundException('Patrimônio com ID "non-existent" não encontrado'),
      );
    });
  });

  describe('createBulk', () => {
    const createDtos: CreatePatrimonioDto[] = [
      {
        codigo: 'PAT-2024-003',
        nome: 'Monitor Dell 24"',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        marca: 'Dell',
        valorAquisicao: 800.00,
      },
      {
        codigo: 'PAT-2024-004',
        nome: 'Teclado Logitech',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        marca: 'Logitech',
        valorAquisicao: 150.00,
      },
    ];

    it('should create multiple patrimonios', async () => {
      // Arrange
      repository.find.mockResolvedValue([]); // No existing patrimonios
      const createdPatrimonios = createDtos.map((dto, index) => ({
        ...mockPatrimonio,
        id: `patrimonio-${index + 3}`,
        codigo: dto.codigo,
        nome: dto.nome,
      }));
      
      repository.create
        .mockReturnValueOnce(createdPatrimonios[0] as any)
        .mockReturnValueOnce(createdPatrimonios[1] as any);
      repository.save.mockResolvedValue(createdPatrimonios as any);

      // Act
      const result = await service.createBulk(createDtos);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'patrimonio-3',
        codigo: 'PAT-2024-003',
        nome: 'Monitor Dell 24"',
      });
      expect(result[1]).toMatchObject({
        id: 'patrimonio-4',
        codigo: 'PAT-2024-004',
        nome: 'Teclado Logitech',
      });
    });

    it('should throw ConflictException when no patrimonios provided', async () => {
      // Act & Assert
      await expect(service.createBulk([])).rejects.toThrow(
        new ConflictException('Nenhum patrimônio fornecido'),
      );
    });

    it('should throw ConflictException when too many patrimonios provided', async () => {
      // Arrange
      const tooManyPatrimonios = Array(101).fill(createDtos[0]);

      // Act & Assert
      await expect(service.createBulk(tooManyPatrimonios)).rejects.toThrow(
        new ConflictException('Máximo 100 patrimônios podem ser criados por vez'),
      );
    });

    it('should throw ConflictException when duplicate codigos in request', async () => {
      // Arrange
      const duplicateCodigos = [
        createDtos[0],
        { ...createDtos[0], nome: 'Different Name' },
      ];

      // Act & Assert
      await expect(service.createBulk(duplicateCodigos)).rejects.toThrow(
        new ConflictException('Códigos duplicados na requisição'),
      );
    });

    it('should throw ConflictException when codigos already exist', async () => {
      // Arrange
      repository.find.mockResolvedValue([mockPatrimonio]); // Existing patrimonio

      // Act & Assert
      await expect(service.createBulk(createDtos)).rejects.toThrow(
        new ConflictException('Códigos já existem: PAT-2024-001'),
      );
    });
  });

  describe('findByCategoria', () => {
    it('should return patrimonios by categoria', async () => {
      // Arrange
      const patrimonios = [mockPatrimonio];
      repository.find.mockResolvedValue(patrimonios);

      // Act
      const result = await service.findByCategoria('EQUIPAMENTO');

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: { categoria: 'EQUIPAMENTO' },
        order: { nome: 'ASC' },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: mockPatrimonio.id,
        categoria: PatrimonioCategoria.EQUIPAMENTO,
      });
    });
  });

  describe('findByResponsavel', () => {
    it('should return patrimonios by responsavel', async () => {
      // Arrange
      const patrimonios = [mockPatrimonio];
      repository.find.mockResolvedValue(patrimonios);

      // Act
      const result = await service.findByResponsavel('user-1');

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: { responsavelId: 'user-1' },
        order: { nome: 'ASC' },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: mockPatrimonio.id,
        responsavelId: 'user-1',
      });
    });
  });

  describe('getStatsByCategoria', () => {
    it('should return stats by categoria', async () => {
      // Arrange
      const mockStats = [
        { categoria: 'EQUIPAMENTO', count: '25' },
        { categoria: 'MOBILIARIO', count: '15' },
      ];
      repository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockStats),
      } as any);

      // Act
      const result = await service.getStatsByCategoria();

      // Assert
      expect(result).toEqual({
        EQUIPAMENTO: 25,
        MOBILIARIO: 15,
      });
    });
  });

  describe('getStatsByStatus', () => {
    it('should return stats by status', async () => {
      // Arrange
      const mockStats = [
        { status: 'ATIVO', count: '45' },
        { status: 'INATIVO', count: '8' },
      ];
      repository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockStats),
      } as any);

      // Act
      const result = await service.getStatsByStatus();

      // Assert
      expect(result).toEqual({
        ATIVO: 45,
        INATIVO: 8,
      });
    });
  });
});
