import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  createMockUser,
  createMockCreateUserDto,
  resetAllMocks,
} from '../../test/utils/test-doubles';

describe('UsersController - Advanced Unit Tests (PDF 086)', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    // Arrange - Setup do módulo de teste com mocks
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllWithAdvancedFilters: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  afterEach(() => {
    resetAllMocks();
  });

  describe('Test Doubles Implementation', () => {
    describe('1. STUB - Service responses', () => {
      it('should return paginated users list', async () => {
        // Arrange - Configurar stub para retornar dados específicos
        const mockUsers = [createMockUser(), createMockUser()];
        const mockResponse = {
          data: mockUsers,
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        };

        usersService.findAllWithAdvancedFilters.mockResolvedValue(mockResponse);

        // Act
        const result = await controller.findAll({});

        // Assert
        expect(result).toEqual(mockResponse);
        expect(usersService.findAllWithAdvancedFilters).toHaveBeenCalledWith(
          {},
        );
      });

      it('should return single user by ID', async () => {
        // Arrange
        const userId = 'test-user-id';
        const mockUser = createMockUser({ id: userId });
        usersService.findOne.mockResolvedValue(mockUser);

        // Act
        const result = await controller.findOne(userId);

        // Assert
        expect(result).toEqual(mockUser);
        expect(usersService.findOne).toHaveBeenCalledWith(userId);
      });
    });

    describe('2. SPY - Method call monitoring', () => {
      it('should spy on service method calls during user creation', async () => {
        // Arrange
        const createUserDto: CreateUserDto = createMockCreateUserDto();
        const createdUser = createMockUser({ email: createUserDto.email });
        usersService.create.mockResolvedValue(createdUser);

        // Act
        const result = await controller.create(createUserDto);

        // Assert - Verificar se o método foi chamado com os parâmetros corretos
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
        expect(usersService.create).toHaveBeenCalledTimes(1);
        expect(result).toEqual(createdUser);
      });

      it('should spy on service method calls during user update', async () => {
        // Arrange
        const userId = 'test-user-id';
        const updateDto: UpdateUserDto = { name: 'Updated Name' };
        const updatedUser = createMockUser({ id: userId, ...updateDto });
        usersService.update.mockResolvedValue(updatedUser);

        // Act
        const result = await controller.update(userId, updateDto);

        // Assert
        expect(usersService.update).toHaveBeenCalledWith(userId, updateDto);
        expect(usersService.update).toHaveBeenCalledTimes(1);
        expect(result).toEqual(updatedUser);
      });
    });

    describe('3. MOCK - Strict expectations', () => {
      it('should enforce strict expectations for user deletion', async () => {
        // Arrange
        const userId = 'test-user-id';
        usersService.remove.mockResolvedValue(undefined);

        // Act
        await controller.remove(userId);

        // Assert - Expectativas rígidas
        expect(usersService.remove).toHaveBeenCalledWith(userId);
        expect(usersService.remove).toHaveBeenCalledTimes(1);

        // Verificar que outros métodos NÃO foram chamados
        expect(usersService.create).not.toHaveBeenCalled();
        expect(usersService.update).not.toHaveBeenCalled();
      });

      it('should enforce strict expectations for filtered search', async () => {
        // Arrange
        const query: QueryUsersDto = {
          page: 2,
          limit: 5,
          role: UserRole.STUDENT,
          isActive: true,
          q: 'john',
        };
        const mockResponse = {
          data: [createMockUser()],
          total: 1,
          page: 2,
          limit: 5,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: true,
        };
        usersService.findAllWithAdvancedFilters.mockResolvedValue(mockResponse);

        // Act
        const result = await controller.findAll(query);

        // Assert - Expectativas rígidas sobre os parâmetros
        expect(usersService.findAllWithAdvancedFilters).toHaveBeenCalledWith(
          query,
        );
        expect(usersService.findAllWithAdvancedFilters).toHaveBeenCalledTimes(
          1,
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('AAA Pattern Implementation', () => {
    describe('Arrange-Act-Assert Pattern', () => {
      it('should follow AAA pattern for successful user creation', async () => {
        // ARRANGE - Preparação dos dados
        const createUserDto: CreateUserDto = createMockCreateUserDto({
          name: 'John Doe',
          email: 'john@example.com',
          role: UserRole.TEACHER,
        });
        const createdUser = createMockUser({
          name: createUserDto.name,
          email: createUserDto.email,
          role: createUserDto.role,
        });
        // Remover passwordHash para simular serialização
        const { passwordHash, ...userWithoutPassword } = createdUser;
        usersService.create.mockResolvedValue(userWithoutPassword);

        // ACT - Execução da ação
        const result = await controller.create(createUserDto);

        // ASSERT - Verificação do resultado
        expect(result).toEqual(
          expect.objectContaining({
            name: createUserDto.name,
            email: createUserDto.email,
            role: createUserDto.role,
          }),
        );
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
        expect(result.passwordHash).toBeUndefined();
      });

      it('should follow AAA pattern for error handling', async () => {
        // ARRANGE - Preparação do cenário de erro
        const createUserDto: CreateUserDto = createMockCreateUserDto();
        const conflictError = new ConflictException('Email already exists');
        usersService.create.mockRejectedValue(conflictError);

        // ACT - Execução que deve gerar erro
        let thrownError: any;
        try {
          await controller.create(createUserDto);
        } catch (error) {
          thrownError = error;
        }

        // ASSERT - Verificação do tratamento de erro
        expect(thrownError).toBeInstanceOf(ConflictException);
        expect(thrownError.message).toBe('Email already exists');
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle service errors gracefully', async () => {
      // Arrange
      const userId = 'non-existent-id';
      const notFoundError = new NotFoundException('User not found');
      usersService.findOne.mockRejectedValue(notFoundError);

      // Act & Assert
      await expect(controller.findOne(userId)).rejects.toThrow(
        NotFoundException,
      );
      expect(usersService.findOne).toHaveBeenCalledWith(userId);
    });

    it('should handle empty query parameters', async () => {
      // Arrange
      const emptyQuery = {};
      const mockResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
      usersService.findAllWithAdvancedFilters.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.findAll(emptyQuery);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(usersService.findAllWithAdvancedFilters).toHaveBeenCalledWith(
        emptyQuery,
      );
    });

    it('should handle complex query parameters', async () => {
      // Arrange
      const complexQuery: QueryUsersDto = {
        page: 3,
        limit: 25,
        q: 'search term',
        role: UserRole.ADMIN,
        isActive: false,
        sortBy: 'email',
        sortOrder: 'ASC',
      };
      const mockResponse = {
        data: [createMockUser()],
        total: 50,
        page: 3,
        limit: 25,
        totalPages: 2,
        hasNextPage: false,
        hasPreviousPage: true,
      };
      usersService.findAllWithAdvancedFilters.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.findAll(complexQuery);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(usersService.findAllWithAdvancedFilters).toHaveBeenCalledWith(
        complexQuery,
      );
    });
  });

  describe('Input Validation and Transformation', () => {
    it('should pass through query parameters correctly', async () => {
      // Arrange
      const queryWithAllParams: QueryUsersDto = {
        page: 2,
        limit: 15,
        q: 'test search',
        role: UserRole.STUDENT,
        isActive: true,
        sortBy: 'name',
        sortOrder: 'DESC',
      };
      usersService.findAllWithAdvancedFilters.mockResolvedValue({
        data: [],
        total: 0,
        page: 2,
        limit: 15,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: true,
      });

      // Act
      await controller.findAll(queryWithAllParams);

      // Assert
      expect(usersService.findAllWithAdvancedFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 2,
          limit: 15,
          q: 'test search',
          role: UserRole.STUDENT,
          isActive: true,
          sortBy: 'name',
          sortOrder: 'DESC',
        }),
      );
    });

    it('should handle partial update DTOs', async () => {
      // Arrange
      const userId = 'test-user-id';
      const partialUpdate: UpdateUserDto = { name: 'New Name' };
      const updatedUser = createMockUser({ id: userId, name: 'New Name' });
      usersService.update.mockResolvedValue(updatedUser);

      // Act
      const result = await controller.update(userId, partialUpdate);

      // Assert
      expect(usersService.update).toHaveBeenCalledWith(userId, partialUpdate);
      expect(result.name).toBe('New Name');
    });
  });

  describe('Response Format Validation', () => {
    it('should return properly formatted paginated response', async () => {
      // Arrange
      const mockUsers = [createMockUser(), createMockUser()];
      const expectedResponse = {
        data: mockUsers,
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      };
      usersService.findAllWithAdvancedFilters.mockResolvedValue(
        expectedResponse,
      );

      // Act
      const result = await controller.findAll({});

      // Assert
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('totalPages');
      expect(result).toHaveProperty('hasNextPage');
      expect(result).toHaveProperty('hasPreviousPage');
      expect(Array.isArray(result.data)).toBe(true);
      expect(typeof result.total).toBe('number');
    });

    it('should return user without sensitive data', async () => {
      // Arrange
      const userWithSensitiveData = createMockUser({
        passwordHash: 'sensitive_hash_data',
      });
      // Remover passwordHash para simular serialização
      const { passwordHash, ...userWithoutPassword } = userWithSensitiveData;
      usersService.findOne.mockResolvedValue(userWithoutPassword);

      // Act
      const result = await controller.findOne('test-id');

      // Assert
      expect(result).not.toHaveProperty('passwordHash');
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
    });
  });
});
