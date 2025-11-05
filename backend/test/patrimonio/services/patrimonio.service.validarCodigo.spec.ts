import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { UsersService } from '../../../src/users/users.service';

describe('PatrimonioService.validarCodigo (unit)', () => {
  let service: PatrimonioService;
  let repository: MockType<Repository<Patrimonio>>;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
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
          useValue: {
            transaction: jest.fn(),
            createQueryRunner: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PatrimonioService);
    repository = module.get(getRepositoryToken(Patrimonio));
  });

  it('should return disponivel: true when codigo does not exist', async () => {
    const codigo = 'PAT-NOVO-001';

    repository.findOne.mockResolvedValue(null);

    const result = await service.validarCodigo(codigo);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { codigo: codigo.toUpperCase() },
    });
    expect(result.disponivel).toBe(true);
  });

  it('should return disponivel: false when codigo exists', async () => {
    const codigo = 'PAT-EXISTENTE';
    const patrimonio = makePatrimonioEntity({ codigo });

    repository.findOne.mockResolvedValue(patrimonio as Patrimonio);

    const result = await service.validarCodigo(codigo);

    expect(result.disponivel).toBe(false);
  });

  it('should convert codigo to uppercase', async () => {
    const codigo = 'pat-minusculo';

    repository.findOne.mockResolvedValue(null);

    await service.validarCodigo(codigo);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { codigo: 'PAT-MINUSCULO' },
    });
  });
});
