import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryDiasDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/query-dias.dto';

describe('PatrimonioController – findGarantiaExpirada', () => {
  let controller: PatrimonioController;
  const service = { findGarantiaExpirada: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/garantia-expirada → delega ao service.findGarantiaExpirada', async () => {
    service.findGarantiaExpirada.mockResolvedValue([]);

    const query: QueryDiasDto = { dias: 30 };
    const res = await controller.findGarantiaExpirada(query);

    expect(service.findGarantiaExpirada).toHaveBeenCalledWith(30);
    expect(res).toEqual([]);
  });

  it('should use default dias = 0 when not provided', async () => {
    service.findGarantiaExpirada.mockResolvedValue([]);

    const query: QueryDiasDto = {};
    const res = await controller.findGarantiaExpirada(query);

    expect(service.findGarantiaExpirada).toHaveBeenCalledWith(0);
    expect(res).toEqual([]);
  });
});
