import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryPatrimonioDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/query-patrimonio.dto';

describe('PatrimonioController – findAll', () => {
  let controller: PatrimonioController;
  const service = { findAllWithFilters: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },

        { provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService },
      ],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio ? delega ao service.findAllWithFilters', async () => {
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

