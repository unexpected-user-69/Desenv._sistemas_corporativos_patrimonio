import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryDiasDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/query-dias.dto';

describe('PatrimonioController – findGarantiaVencendo', () => {
  let controller: PatrimonioController;
  const service = { findGarantiaVencendo: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService },
      ],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/alertas/garantia → delega ao service.findGarantiaVencendo com dias padrão', async () => {
    service.findGarantiaVencendo.mockResolvedValue([]);

    const query: QueryDiasDto = {};
    const res = await controller.findGarantiaVencendo(query);

    expect(service.findGarantiaVencendo).toHaveBeenCalledWith(30);
    expect(res).toEqual([]);
  });

  it('GET /patrimonio/alertas/garantia?dias=60 → delega ao service.findGarantiaVencendo com dias customizado', async () => {
    service.findGarantiaVencendo.mockResolvedValue([]);

    const query: QueryDiasDto = { dias: 60 };
    const res = await controller.findGarantiaVencendo(query);

    expect(service.findGarantiaVencendo).toHaveBeenCalledWith(60);
    expect(res).toEqual([]);
  });
});
