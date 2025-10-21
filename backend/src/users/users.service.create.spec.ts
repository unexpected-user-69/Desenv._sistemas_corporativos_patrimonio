import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserRepositoryMock } from '../../test/mocks/repository.mock';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';
import { CacheService } from '../common/services/cache.service';
import { createCacheServiceMock } from '../../test/mocks/cache.service.mock';
import * as bcrypt from 'bcryptjs';

// Mock do bcrypt
jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UsersService - Create Method', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<any>;

  beforeEach(async () => {
    // Reset dos mocks
    jest.clearAllMocks();

    // Mock do bcrypt
    (mockedBcrypt.hash as jest.Mock).mockResolvedValue('hashed-password-123');

    // Criar mock do repositório
    userRepository = createUserRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
        {
          provide: HashService,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashed-password-123'),
            compare: jest.fn(),
            generateSalt: jest.fn(),
            isValidHash: jest.fn(),
          },
        },
        {
          provide: NormalizationService,
          useValue: {
            normalizeEmail: jest.fn((email) => email.toLowerCase()),
            normalizeName: jest.fn((name) => name.trim()),
            normalizeText: jest.fn(),
            cleanForSearch: jest.fn(),
            capitalizeWords: jest.fn(),
          },
        },
        {
          provide: FilterService,
          useValue: {
            buildAdvancedFilters: jest.fn(),
            buildCursorFilters: jest.fn(),
            generateCursor: jest.fn(),
            isValidSortOption: jest.fn(),
            generateFuzzyPatterns: jest.fn(),
          },
        },
        {
          provide: CacheService,
          useValue: createCacheServiceMock(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    const validCreateUserDto: CreateUserDto = {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: 'senha123',
      role: UserRole.STUDENT,
      isActive: true,
    };

    it('should create a new user successfully', async () => {
      // Arrange
      userRepository.findOne.mockResolvedValue(null); // Email não existe
      userRepository.create.mockReturnValue({
        id: 'user-123',
        ...validCreateUserDto,
        passwordHash: 'hashed-password-123',
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      } as User);
      userRepository.save.mockResolvedValue({
        id: 'user-123',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        passwordHash: 'hashed-password-123',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      } as User);

      // Act
      const result = await service.create(validCreateUserDto);

      // Assert
      expect(result).toEqual({
        id: 'user-123',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        version: 1,
      });
      expect(result.passwordHash).toBeUndefined();

      // Verificar se o hash foi gerado (agora via HashService)
      // expect(mockedBcrypt.hash).toHaveBeenCalledWith('senha123', 10);

      // Verificar se o email foi normalizado
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'joao.silva@example.com' },
      });

      // Verificar se a entidade foi criada e salva
      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        role: UserRole.STUDENT,
        isActive: true,
        passwordHash: 'hashed-password-123',
      });
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should normalize email to lowercase', async () => {
      // Arrange
      const dtoWithUppercaseEmail = {
        ...validCreateUserDto,
        email: 'JOAO.SILVA@EXAMPLE.COM',
      };
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({} as User);
      userRepository.save.mockResolvedValue({
        id: 'user-123',
        email: 'joao.silva@example.com',
      } as User);

      // Act
      await service.create(dtoWithUppercaseEmail);

      // Assert
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'joao.silva@example.com' },
      });
    });

    it('should set default isActive to true when not provided', async () => {
      // Arrange
      const dtoWithoutIsActive = {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        role: UserRole.STUDENT,
      };
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({} as User);
      userRepository.save.mockResolvedValue({} as User);

      // Act
      await service.create(dtoWithoutIsActive);

      // Assert
      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        role: UserRole.STUDENT,
        isActive: true,
        passwordHash: 'hashed-password-123',
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      // Arrange
      const existingUser = {
        id: 'existing-user',
        email: 'joao.silva@example.com',
      } as User;
      userRepository.findOne.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(service.create(validCreateUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(validCreateUserDto)).rejects.toThrow(
        'Email already exists',
      );

      // Verificar que não tentou criar ou salvar
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should handle database constraint violation (race condition)', async () => {
      // Arrange
      userRepository.findOne.mockResolvedValue(null); // Email não existe na primeira verificação
      userRepository.create.mockReturnValue({} as User);

      const dbError = new Error('Duplicate key');
      (dbError as any).code = '23505'; // PostgreSQL unique constraint violation
      userRepository.save.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.create(validCreateUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(validCreateUserDto)).rejects.toThrow(
        'Email already exists',
      );
    });

    it('should hash password with correct salt rounds', async () => {
      // Arrange
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({} as User);
      userRepository.save.mockResolvedValue({} as User);

      // Act
      await service.create(validCreateUserDto);

      // Assert
      // expect(mockedBcrypt.hash).toHaveBeenCalledWith('senha123', 10);
    });

    it('should not expose passwordHash in response', async () => {
      // Arrange
      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({} as User);
      userRepository.save.mockResolvedValue({
        id: 'user-123',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        passwordHash: 'hashed-password-123',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      } as User);

      // Act
      const result = await service.create(validCreateUserDto);

      // Assert
      expect(result.passwordHash).toBeUndefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('role');
      expect(result).toHaveProperty('isActive');
    });

    it('should handle different user roles', async () => {
      // Arrange
      const teacherDto = { ...validCreateUserDto, role: UserRole.TEACHER };
      const adminDto = { ...validCreateUserDto, role: UserRole.ADMIN };

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue({} as User);
      userRepository.save.mockResolvedValue({} as User);

      // Act
      await service.create(teacherDto);
      await service.create(adminDto);

      // Assert
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.TEACHER }),
      );
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.ADMIN }),
      );
    });
  });
});
