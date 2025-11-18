import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { UsersService } from '../../../src/users/users.service';
import { StorageService } from '../../../src/patrimonio/services/storage.service';

/**
 * Helper para criar providers de teste do PatrimonioService
 */
export function createPatrimonioServiceTestProviders(
  usersService: Partial<UsersService> = {},
  storageService: Partial<StorageService> = {},
) {
  return [
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
      useValue: usersService || {
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
      useValue: storageService || {
        saveFile: jest.fn(),
        deleteFile: jest.fn(),
        fileExists: jest.fn(),
        validateFile: jest.fn(),
      },
    },
  ];
}

