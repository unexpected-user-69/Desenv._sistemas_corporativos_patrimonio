import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { QueryPatrimonioDto } from '../../../src/patrimonio/dto/query-patrimonio.dto';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController – exportToCsv', () => {
  let controller: PatrimonioController;
  const service = { exportToCsv: jest.fn() };
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockResponse = {
      setHeader: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/export/csv → delega ao service.exportToCsv', async () => {
    const query: QueryPatrimonioDto = {};
    service.exportToCsv.mockResolvedValue(undefined);

    await controller.exportToCsv(query, mockResponse as Response);

    expect(service.exportToCsv).toHaveBeenCalledWith(query, mockResponse);
  });

  it('should pass query filters to service', async () => {
    const query: QueryPatrimonioDto = { status: PatrimonioStatus.ATIVO, q: 'test' };
    service.exportToCsv.mockResolvedValue(undefined);

    await controller.exportToCsv(query, mockResponse as Response);

    expect(service.exportToCsv).toHaveBeenCalledWith(query, mockResponse);
  });
});
