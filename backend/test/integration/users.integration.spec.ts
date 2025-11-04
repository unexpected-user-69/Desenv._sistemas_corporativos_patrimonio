import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../src/users/users.service';
import { User, UserRole } from '../../src/users/entities/user.entity';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto';
import { FakeUserRepository } from '../utils/test-doubles';
import * as bcrypt from 'bcryptjs';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn((password) => Promise.resolve(`hashed_${password}`)),
  compare: jest.fn((password, hash) =>
    Promise.resolve(hash === `hashed_${password}`),
  ),
}));

describe('UsersService - Integration Tests with Fake Repository (PDF 086)', () => {
  let service: UsersService;
  let fakeRepository: FakeUserRepository;

  beforeEach(async () => {
    // Arrange - Setup do módulo com Fake Repository
    fakeRepository = new FakeUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    fakeRepository.clear();
  });

  describe('FAKE Repository Implementation (PDF 086)', () => {
    describe('User Creation Flow', () => {
      it('should create user with complete flow using fake repository', async () => {
        // Arrange
        const createUserDto: CreateUserDto = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: UserRole.STUDENT,
          isActive: true,
        };

        // Act
        const result = await service.create(createUserDto);

        // Assert
        expect(result).toEqual(
          expect.objectContaining({
            name: createUserDto.name,
            email: createUserDto.email.toLowerCase(),
            role: createUserDto.role,
            isActive: createUserDto.isActive,
          }),
        );
        expect(result.passwordHash).toBeUndefined();
        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.version).toBe(1);
      });

      it('should prevent duplicate email creation', async () => {
        // Arrange
        const createUserDto: CreateUserDto = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: UserRole.STUDENT,
        };

        // Act - Criar primeiro usuário
        await service.create(createUserDto);

        // Act & Assert - Tentar criar segundo usuário com mesmo email
        await expect(service.create(createUserDto)).rejects.toThrow(
          'Email already exists',
        );
      });
    });

    describe('User Retrieval Flow', () => {
      beforeEach(() => {
        // Seed fake repository with test data
        fakeRepository.seed([
          {
            id: '1',
            name: 'Alice Smith',
            email: 'alice@example.com',
            passwordHash: 'hashed_password1',
            role: UserRole.STUDENT,
            isActive: true,
            createdAt: new Date('2023-01-01T10:00:00Z'),
            updatedAt: new Date('2023-01-01T10:00:00Z'),
            version: 1,
            deletedAt: null,
            avatarUrl: null,
          },
          {
            id: '2',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            passwordHash: 'hashed_password2',
            role: UserRole.TEACHER,
            isActive: true,
            createdAt: new Date('2023-01-02T10:00:00Z'),
            updatedAt: new Date('2023-01-02T10:00:00Z'),
            version: 1,
            deletedAt: null,
            avatarUrl: null,
          },
          {
            id: '3',
            name: 'Charlie Brown',
            email: 'charlie@example.com',
            passwordHash: 'hashed_password3',
            role: UserRole.STUDENT,
            isActive: false,
            createdAt: new Date('2023-01-03T10:00:00Z'),
            updatedAt: new Date('2023-01-03T10:00:00Z'),
            version: 1,
            deletedAt: null,
            avatarUrl: null,
          },
        ]);
      });

      it('should retrieve single user by ID', async () => {
        // Act
        const result = await service.findOne('1');

        // Assert
        expect(result).toEqual(
          expect.objectContaining({
            id: '1',
            name: 'Alice Smith',
            email: 'alice@example.com',
            role: UserRole.STUDENT,
          }),
        );
        expect(result.passwordHash).toBeUndefined();
      });

      it('should return all users with pagination', async () => {
        // Act
        const result = await service.findAllWithAdvancedFilters({
          page: 1,
          limit: 10,
        });

        // Assert
        expect(result.data).toHaveLength(3);
        expect(result.total).toBe(3);
        expect(result.page).toBe(1);
        expect(result.limit).toBe(10);
        expect(result.totalPages).toBe(1);
        expect(result.hasNextPage).toBe(false);
        expect(result.hasPreviousPage).toBe(false);
      });

      it('should filter users by role', async () => {
        // Act
        const result = await service.findAllWithAdvancedFilters({
          role: UserRole.STUDENT,
        });

        // Assert
        expect(result.data).toHaveLength(2);
        expect(
          result.data.every((user) => user.role === UserRole.STUDENT),
        ).toBe(true);
        expect(result.total).toBe(2);
      });

      it('should filter users by active status', async () => {
        // Act
        const result = await service.findAllWithAdvancedFilters({
          isActive: true,
        });

        // Assert
        expect(result.data).toHaveLength(2);
        expect(result.data.every((user) => user.isActive === true)).toBe(true);
        expect(result.total).toBe(2);
      });

      it('should search users by name or email', async () => {
        // Act
        const result = await service.findAllWithAdvancedFilters({
          q: 'alice',
        });

        // Assert
        expect(result.data).toHaveLength(1);
        expect(result.data[0].name).toBe('Alice Smith');
        expect(result.total).toBe(1);
      });

      it('should combine multiple filters', async () => {
        // Act
        const result = await service.findAllWithAdvancedFilters({
          role: UserRole.STUDENT,
          isActive: true,
        });

        // Assert
        expect(result.data).toHaveLength(1);
        expect(result.data[0].name).toBe('Alice Smith');
        expect(result.total).toBe(1);
      });
    });

    describe('User Update Flow', () => {
      beforeEach(async () => {
        // Create a user first
        const createUserDto: CreateUserDto = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: UserRole.STUDENT,
        };
        await service.create(createUserDto);
      });

      it('should update user information', async () => {
        // Arrange
        const users = await service.findAllWithAdvancedFilters({});
        const userId = users.data[0].id;
        const updateDto: UpdateUserDto = {
          name: 'John Updated',
          role: UserRole.TEACHER,
        };

        // Act
        const result = await service.update(userId, updateDto);

        // Assert
        expect(result).toEqual(
          expect.objectContaining({
            id: userId,
            name: 'John Updated',
            role: UserRole.TEACHER,
            email: 'john@example.com', // Should remain unchanged
          }),
        );
        expect(result.updatedAt).not.toEqual(result.createdAt);
      });

      it('should update password when provided', async () => {
        // Arrange
        const users = await service.findAllWithAdvancedFilters({});
        const userId = users.data[0].id;
        const updateDto: UpdateUserDto = {
          password: 'newpassword123',
        };

        // Act
        const result = await service.update(userId, updateDto);

        // Assert
        expect(result).toBeDefined();
        expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      });
    });

    describe('User Deletion Flow', () => {
      beforeEach(async () => {
        // Create a user first
        const createUserDto: CreateUserDto = {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: UserRole.STUDENT,
        };
        await service.create(createUserDto);
      });

      it('should soft delete user', async () => {
        // Arrange
        const users = await service.findAllWithAdvancedFilters({});
        const userId = users.data[0].id;

        // Act
        await service.remove(userId);

        // Assert - User should still exist but be soft deleted
        const allUsers = await service.findAllWithAdvancedFilters({});
        expect(allUsers.data).toHaveLength(0); // Soft deleted users should not appear
      });

      it('should throw error when trying to delete non-existent user', async () => {
        // Act & Assert
        await expect(service.remove('non-existent-id')).rejects.toThrow(
          'User with ID "non-existent-id" not found',
        );
      });
    });

    describe('Complex Scenarios', () => {
      beforeEach(() => {
        // Seed with more complex data
        fakeRepository.seed([
          {
            id: '1',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            passwordHash: 'hashed_password1',
            role: UserRole.STUDENT,
            isActive: true,
            createdAt: new Date('2023-01-01T10:00:00Z'),
            updatedAt: new Date('2023-01-01T10:00:00Z'),
            version: 1,
            deletedAt: null,
            avatarUrl: null,
          },
          {
            id: '2',
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            passwordHash: 'hashed_password2',
            role: UserRole.TEACHER,
            isActive: true,
            createdAt: new Date('2023-01-02T10:00:00Z'),
            updatedAt: new Date('2023-01-02T10:00:00Z'),
            version: 1,
            deletedAt: null,
            avatarUrl: null,
          },
          {
            id: '3',
            name: 'Charlie Johnson',
            email: 'charlie.johnson@example.com',
            passwordHash: 'hashed_password3',
            role: UserRole.ADMIN,
            isActive: false,
            createdAt: new Date('2023-01-03T10:00:00Z'),
            updatedAt: new Date('2023-01-03T10:00:00Z'),
            version: 1,
            deletedAt: null,
            avatarUrl: null,
          },
        ]);
      });

      it('should handle pagination with large datasets', async () => {
        // Act - Get first page
        const page1 = await service.findAllWithAdvancedFilters({
          page: 1,
          limit: 2,
        });

        // Assert
        expect(page1.data).toHaveLength(2);
        expect(page1.total).toBe(3);
        expect(page1.page).toBe(1);
        expect(page1.hasNextPage).toBe(true);
        expect(page1.hasPreviousPage).toBe(false);

        // Act - Get second page
        const page2 = await service.findAllWithAdvancedFilters({
          page: 2,
          limit: 2,
        });

        // Assert
        expect(page2.data).toHaveLength(1);
        expect(page2.total).toBe(3);
        expect(page2.page).toBe(2);
        expect(page2.hasNextPage).toBe(false);
        expect(page2.hasPreviousPage).toBe(true);
      });

      it('should handle complex filtering scenarios', async () => {
        // Act - Search for "johnson" in name/email
        const result = await service.findAllWithAdvancedFilters({
          q: 'johnson',
          isActive: true,
        });

        // Assert
        expect(result.data).toHaveLength(2);
        expect(
          result.data.every(
            (user) =>
              (user.name.toLowerCase().includes('johnson') ||
                user.email.toLowerCase().includes('johnson')) &&
              user.isActive === true,
          ),
        ).toBe(true);
      });

      it('should handle empty results gracefully', async () => {
        // Act
        const result = await service.findAllWithAdvancedFilters({
          q: 'nonexistent',
        });

        // Assert
        expect(result.data).toEqual([]);
        expect(result.total).toBe(0);
        expect(result.totalPages).toBe(0);
        expect(result.hasNextPage).toBe(false);
        expect(result.hasPreviousPage).toBe(false);
      });
    });
  });
});
