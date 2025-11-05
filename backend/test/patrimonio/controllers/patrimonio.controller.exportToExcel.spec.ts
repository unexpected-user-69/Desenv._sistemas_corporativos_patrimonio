import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { QueryPatrimonioDto } from '../../../src/patrimonio/dto/query-patrimonio.dto';

describe('PatrimonioController – exportToExcel', () => {
  let controller: PatrimonioController;
  const service = { exportToExcel: jest.fn() };
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

  it('GET /patrimonio/export/excel → delega ao service.exportToExcel', async () => {
    const query: QueryPatrimonioDto = {};
    service.exportToExcel.mockResolvedValue(undefined);

    await controller.exportToExcel(query, mockResponse as Response);

    expect(service.exportToExcel).toHaveBeenCalledWith(query, mockResponse);
  });

  it('should pass query filters to service', async () => {
    const query: QueryPatrimonioDto = { categoriaId: '123' };
    service.exportToExcel.mockResolvedValue(undefined);

    await controller.exportToExcel(query, mockResponse as Response);

    expect(service.exportToExcel).toHaveBeenCalledWith(query, mockResponse);
  });
});
