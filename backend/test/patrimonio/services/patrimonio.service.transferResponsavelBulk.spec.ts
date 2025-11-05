import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';
import { TransferirResponsavelBulkDto } from '../../../src/patrimonio/dto/transferir-responsavel-bulk.dto';
import { randomUUID } from 'crypto';

describe('PatrimonioService.transferResponsavelBulk (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;
  let dataSource: DataSource;
  let queryRunner: Partial<QueryRunner>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    queryRunner = {
      connect: jest.fn().mockResolvedValue(undefined),
      startTransaction: jest.fn().mockResolvedValue(undefined),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      rollbackTransaction: jest.fn().mockResolvedValue(undefined),
      release: jest.fn().mockResolvedValue(undefined),
      manager: {
        save: jest.fn(),
      } as any,
    };

    const mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunner),
    };

    const module = await Test.createTestingModule({
      providers: [
        PatrimonioService,
        {
          provide: getRepositoryToken(Patrimonio),
          useFactory: repositoryMockFactory,
        },
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
    dataSource = module.get(DataSource);
  });

  it('should transfer multiple patrimonios successfully', async () => {
    const id1 = randomUUID();
    const id2 = randomUUID();
    const novoResponsavelId = randomUUID();
    const dto: TransferirResponsavelBulkDto = {
      ids: [id1, id2],
      novoResponsavelId,
      observacoes: 'Transferência em lote',
    };

    const patrimonio1 = makePatrimonioEntity({ id: id1 });
    const patrimonio2 = makePatrimonioEntity({ id: id2 });

    repository.find.mockResolvedValue([
      patrimonio1,
      patrimonio2,
    ] as Patrimonio[]);
    usersService.findOne!.mockResolvedValue({
      id: novoResponsavelId,
    } as any);
    queryRunner.manager!.save!.mockResolvedValueOnce(patrimonio1 as Patrimonio);
    queryRunner.manager!.save!.mockResolvedValueOnce(patrimonio2 as Patrimonio);

    const result = await service.transferResponsavelBulk(dto);

    expect(repository.find).toHaveBeenCalled();
    expect(usersService.findOne).toHaveBeenCalledWith(novoResponsavelId);
    expect(queryRunner.commitTransaction).toHaveBeenCalled();
    expect(result.transferidos).toBe(2);
  });

  it('should throw NotFoundException when some patrimonios not found', async () => {
    const id1 = randomUUID();
    const id2 = randomUUID();
    const id3 = randomUUID();
    const novoResponsavelId = randomUUID();
    const dto: TransferirResponsavelBulkDto = {
      ids: [id1, id2, id3],
      novoResponsavelId,
    };

    const patrimonio1 = makePatrimonioEntity({ id: id1 });

    repository.find.mockResolvedValue([patrimonio1] as Patrimonio[]);

    await expect(service.transferResponsavelBulk(dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when responsavel not found', async () => {
    const id1 = randomUUID();
    const novoResponsavelId = randomUUID();
    const dto: TransferirResponsavelBulkDto = {
      ids: [id1],
      novoResponsavelId,
    };

    const patrimonio1 = makePatrimonioEntity({ id: id1 });

    repository.find.mockResolvedValue([patrimonio1] as Patrimonio[]);
    usersService.findOne!.mockRejectedValue(
      new NotFoundException('Usuário não encontrado'),
    );

    await expect(service.transferResponsavelBulk(dto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
