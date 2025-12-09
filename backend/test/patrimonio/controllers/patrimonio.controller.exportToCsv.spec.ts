import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryPatrimonioDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/query-patrimonio.dto';
import { PatrimonioStatus } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController – exportToCsv', () => {
  let controller: PatrimonioController;
  const service = { exportToCsv: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockResponse = {
      setHeader: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: 'Reflector', useValue: { getAllAndOverride: jest.fn() } },
{ provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/export/csv ? delega ao service.exportToCsv', async () => {
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
