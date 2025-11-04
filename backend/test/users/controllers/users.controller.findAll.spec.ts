import { Test } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { QueryUsersDto } from '../../../src/users/dto/query-users.dto';

describe('UsersController – findAll', () => {
  let controller: UsersController;
  const service = { findAllWithAdvancedFilters: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();
    controller = mod.get(UsersController);
    jest.clearAllMocks();
  });

  it('GET /users → delega ao service.findAllWithAdvancedFilters', async () => {
    const query: QueryUsersDto = { page: 1, limit: 10 };
    const mockResponse = {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    };
    service.findAllWithAdvancedFilters.mockResolvedValue(mockResponse);

    const res = await controller.findAll(query);

    expect(service.findAllWithAdvancedFilters).toHaveBeenCalledWith(query);
    expect(res).toEqual(mockResponse);
  });
});

