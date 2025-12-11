import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { AxiosError } from 'axios';

import { UsersHttpClient, UserIdentity } from '../../../src/auth/users-http-client';

describe('UsersHttpClient (unit)', () => {
  let client: UsersHttpClient;
  let httpService: jest.Mocked<HttpService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    // Mock HttpService
    httpService = {
      post: jest.fn(),
      get: jest.fn(),
    } as any;

    // Mock ConfigService
    configService = {
      get: jest.fn(),
    } as any;

    const mod = await Test.createTestingModule({
      providers: [
        UsersHttpClient,
        { provide: HttpService, useValue: httpService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    client = mod.get(UsersHttpClient);
  });

  describe('constructor', () => {
    it('should initialize with default baseUrl when USERS_API_URL is not set', () => {
      configService.get.mockReturnValue(undefined);
      
      const mod = Test.createTestingModule({
        providers: [
          UsersHttpClient,
          { provide: HttpService, useValue: httpService },
          { provide: ConfigService, useValue: configService },
        ],
      });

      expect(configService.get).toHaveBeenCalledWith('USERS_API_URL');
    });

    it('should initialize with custom baseUrl from USERS_API_URL', () => {
      configService.get.mockImplementation((key: string) => {
        if (key === 'USERS_API_URL') return 'http://custom-users:3000';
        if (key === 'USERS_API_TIMEOUT') return undefined;
        return undefined;
      });

      const mod = Test.createTestingModule({
        providers: [
          UsersHttpClient,
          { provide: HttpService, useValue: httpService },
          { provide: ConfigService, useValue: configService },
        ],
      });

      expect(configService.get).toHaveBeenCalledWith('USERS_API_URL');
    });

    it('should initialize with custom timeout from USERS_API_TIMEOUT', () => {
      configService.get.mockImplementation((key: string) => {
        if (key === 'USERS_API_URL') return undefined;
        if (key === 'USERS_API_TIMEOUT') return 10000;
        return undefined;
      });

      const mod = Test.createTestingModule({
        providers: [
          UsersHttpClient,
          { provide: HttpService, useValue: httpService },
          { provide: ConfigService, useValue: configService },
        ],
      });

      expect(configService.get).toHaveBeenCalledWith('USERS_API_TIMEOUT');
    });
  });

  describe('validateCredentials', () => {
    const mockUserResponse = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      name: 'Test User',
      role: 'ADMIN',
      isActive: true,
      avatarUrl: null,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      version: 1,
    };

    it('should return UserIdentity for valid credentials', async () => {
      httpService.post.mockReturnValue(
        of({
          data: mockUserResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await client.validateCredentials(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual({
        id: mockUserResponse.id,
        email: mockUserResponse.email,
        name: mockUserResponse.name,
        roles: [mockUserResponse.role],
      });

      expect(httpService.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/validate'),
        {
          email: 'test@example.com',
          password: 'password123',
        },
        expect.objectContaining({
          timeout: expect.any(Number),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should return null when response data is null (invalid credentials)', async () => {
      httpService.post.mockReturnValue(
        of({
          data: null,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await client.validateCredentials(
        'invalid@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
      expect(httpService.post).toHaveBeenCalled();
    });

    it('should return null for 401 status (unauthorized)', async () => {
      const axiosError = new AxiosError('Unauthorized');
      axiosError.response = {
        status: 401,
        statusText: 'Unauthorized',
        data: {},
        headers: {},
        config: {} as any,
      };

      httpService.post.mockReturnValue(throwError(() => axiosError));

      const result = await client.validateCredentials(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });

    it('should return null for 404 status (not found)', async () => {
      const axiosError = new AxiosError('Not Found');
      axiosError.response = {
        status: 404,
        statusText: 'Not Found',
        data: {},
        headers: {},
        config: {} as any,
      };

      httpService.post.mockReturnValue(throwError(() => axiosError));

      const result = await client.validateCredentials(
        'notfound@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should return null for network errors (timeout, connection refused, etc.)', async () => {
      const axiosError = new AxiosError('Network Error');
      axiosError.code = 'ECONNREFUSED';
      axiosError.response = undefined;

      httpService.post.mockReturnValue(throwError(() => axiosError));

      const result = await client.validateCredentials(
        'test@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should return null for 500 status (server error)', async () => {
      const axiosError = new AxiosError('Internal Server Error');
      axiosError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: {},
        headers: {},
        config: {} as any,
      };

      httpService.post.mockReturnValue(throwError(() => axiosError));

      const result = await client.validateCredentials(
        'test@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should return null for non-AxiosError exceptions', async () => {
      httpService.post.mockReturnValue(
        throwError(() => new Error('Unexpected error')),
      );

      const result = await client.validateCredentials(
        'test@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should convert role string to roles array', async () => {
      const responseWithRole = {
        ...mockUserResponse,
        role: 'MANAGER',
      };

      httpService.post.mockReturnValue(
        of({
          data: responseWithRole,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await client.validateCredentials(
        'test@example.com',
        'password123',
      );

      expect(result?.roles).toEqual(['MANAGER']);
    });
  });

  describe('getUserById', () => {
    const mockUserResponse = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      name: 'Test User',
      role: 'ADMIN',
      isActive: true,
      avatarUrl: null,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      version: 1,
    };

    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should return UserIdentity for existing user', async () => {
      httpService.get.mockReturnValue(
        of({
          data: mockUserResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await client.getUserById(userId);

      expect(result).toEqual({
        id: mockUserResponse.id,
        email: mockUserResponse.email,
        name: mockUserResponse.name,
        roles: [mockUserResponse.role],
      });

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining(`/users/${userId}`),
        expect.objectContaining({
          timeout: expect.any(Number),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should return null for 404 status (user not found)', async () => {
      const axiosError = new AxiosError('Not Found');
      axiosError.response = {
        status: 404,
        statusText: 'Not Found',
        data: {},
        headers: {},
        config: {} as any,
      };

      httpService.get.mockReturnValue(throwError(() => axiosError));

      const result = await client.getUserById(userId);

      expect(result).toBeNull();
    });

    it('should return null for network errors', async () => {
      const axiosError = new AxiosError('Network Error');
      axiosError.code = 'ETIMEDOUT';
      axiosError.response = undefined;

      httpService.get.mockReturnValue(throwError(() => axiosError));

      const result = await client.getUserById(userId);

      expect(result).toBeNull();
    });

    it('should return null for 500 status (server error)', async () => {
      const axiosError = new AxiosError('Internal Server Error');
      axiosError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: {},
        headers: {},
        config: {} as any,
      };

      httpService.get.mockReturnValue(throwError(() => axiosError));

      const result = await client.getUserById(userId);

      expect(result).toBeNull();
    });

    it('should return null for non-AxiosError exceptions', async () => {
      httpService.get.mockReturnValue(
        throwError(() => new Error('Unexpected error')),
      );

      const result = await client.getUserById(userId);

      expect(result).toBeNull();
    });

    it('should convert role string to roles array', async () => {
      const responseWithRole = {
        ...mockUserResponse,
        role: 'OPERATOR',
      };

      httpService.get.mockReturnValue(
        of({
          data: responseWithRole,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await client.getUserById(userId);

      expect(result?.roles).toEqual(['OPERATOR']);
    });
  });
});

