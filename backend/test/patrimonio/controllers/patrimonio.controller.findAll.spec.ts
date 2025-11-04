import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { QueryPatrimonioDto } from '../../../src/patrimonio/dto/query-patrimonio.dto';

describe('PatrimonioController – findAll', () => {
  let controller: PatrimonioController;
  const service = { findAllWithFilters: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio → delega ao service.findAllWithFilters', async () => {
    const filters: QueryPatrimonioDto = { page: 1, limit: 10 };
    const mockResponse = {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    };
    service.findAllWithFilters.mockResolvedValue(mockResponse);

    const res = await controller.findAll(filters);

    expect(service.findAllWithFilters).toHaveBeenCalledWith(filters);
    expect(res).toEqual(mockResponse);
  });
});

