import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';
import { createRepositoryMock } from '../../test/mocks/repository.mock';

describe('UsersService - New Methods', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;
  let hashService: jest.Mocked<HashService>;
  let normalizationService: jest.Mocked<NormalizationService>;
  let filterService: jest.Mocked<FilterService>;

  const mockUser: User = {
    id: 'user-1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    passwordHash: 'hashed-password',
    role: UserRole.STUDENT,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    version: 1,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createRepositoryMock<User>(),
        },
        {
          provide: HashService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
            generateSalt: jest.fn(),
            isValidHash: jest.fn(),
          },
        },
        {
          provide: NormalizationService,
          useValue: {
            normalizeEmail: jest.fn(),
            normalizeName: jest.fn(),
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
            buildFuzzyFilters: jest.fn(),
            buildDateRangeFilters: jest.fn(),
            validateSortOptions: jest.fn(),
            generateCursor: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    hashService = module.get(HashService);
    normalizationService = module.get(NormalizationService);
    filterService = module.get(FilterService);
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      // Arrange
      const email = 'joao.silva@example.com';
      const normalizedEmail = 'joao.silva@example.com';
      normalizationService.normalizeEmail.mockReturnValue(normalizedEmail);
      userRepository.findOne.mockResolvedValue(mockUser);

      // Act
      const result = await service.findByEmail(email);

      // Assert
      expect(normalizationService.normalizeEmail).toHaveBeenCalledWith(email);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: normalizedEmail },
      });
      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        isActive: mockUser.isActive,
        avatarUrl: mockUser.avatarUrl,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        version: mockUser.version,
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      // Arrange
      const email = 'notfound@example.com';
      const normalizedEmail = 'notfound@example.com';
      normalizationService.normalizeEmail.mockReturnValue(normalizedEmail);
      userRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findByEmail(email)).rejects.toThrow(
        new NotFoundException(`User with email "${email}" not found`),
      );
    });
  });

  describe('createBulk', () => {
    const createUserDtos: CreateUserDto[] = [
      {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        role: UserRole.STUDENT,
        isActive: true,
      },
      {
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        password: 'senha456',
        role: UserRole.TEACHER,
        isActive: true,
      },
    ];

    it('should create multiple users successfully', async () => {
      // Arrange
      const normalizedDtos = createUserDtos.map((dto, index) => ({
        ...dto,
        email: `user${index}@example.com`,
        name: `User ${index}`,
      }));

      normalizationService.normalizeEmail
        .mockReturnValueOnce('user0@example.com')
        .mockReturnValueOnce('user1@example.com');
      normalizationService.normalizeName
        .mockReturnValueOnce('User 0')
        .mockReturnValueOnce('User 1');

      userRepository.find.mockResolvedValue([]); // No existing users
      hashService.hash
        .mockResolvedValueOnce('hashed-password-1')
        .mockResolvedValueOnce('hashed-password-2');

      const createdUsers = normalizedDtos.map((dto, index) => ({
        ...mockUser,
        id: `user-${index}`,
        name: dto.name,
        email: dto.email,
        passwordHash: `hashed-password-${index + 1}`,
      }));

      userRepository.create
        .mockReturnValueOnce(createdUsers[0] as any)
        .mockReturnValueOnce(createdUsers[1] as any);
      userRepository.save.mockResolvedValue(createdUsers as any);

      // Act
      const result = await service.createBulk(createUserDtos);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'user-0',
        name: 'User 0',
        email: 'user0@example.com',
      });
      expect(result[1]).toMatchObject({
        id: 'user-1',
        name: 'User 1',
        email: 'user1@example.com',
      });
    });

    it('should throw ConflictException when no users provided', async () => {
      // Act & Assert
      await expect(service.createBulk([])).rejects.toThrow(
        new ConflictException('No users provided'),
      );
    });

    it('should throw ConflictException when too many users provided', async () => {
      // Arrange
      const tooManyUsers = Array(101).fill(createUserDtos[0]);

      // Act & Assert
      await expect(service.createBulk(tooManyUsers)).rejects.toThrow(
        new ConflictException('Maximum 100 users can be created at once'),
      );
    });

    it('should throw ConflictException when duplicate emails in request', async () => {
      // Arrange
      const duplicateEmails = [
        createUserDtos[0],
        { ...createUserDtos[0], name: 'Different Name' },
      ];

      normalizationService.normalizeEmail
        .mockReturnValue('same@example.com')
        .mockReturnValue('same@example.com');

      // Act & Assert
      await expect(service.createBulk(duplicateEmails)).rejects.toThrow(
        new ConflictException('Duplicate emails in the request'),
      );
    });

    it('should throw ConflictException when emails already exist', async () => {
      // Arrange
      normalizationService.normalizeEmail
        .mockReturnValueOnce('existing@example.com')
        .mockReturnValueOnce('new@example.com');
      normalizationService.normalizeName
        .mockReturnValueOnce('Existing User')
        .mockReturnValueOnce('New User');

      userRepository.find.mockResolvedValue([mockUser]); // Existing user

      // Act & Assert
      await expect(service.createBulk(createUserDtos)).rejects.toThrow(
        new ConflictException('Emails already exist: joao.silva@example.com'),
      );
    });
  });
});
