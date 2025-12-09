import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryValorRangeDto } from '../../../src/patrimonio/dto/query-valor-range.dto';

describe('PatrimonioController – findByValorRange', () => {
  let controller: PatrimonioController;
  const service = { findByValorRange: jest.fn() };
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

  it('GET /patrimonio/valor-range → delega ao service.findByValorRange', async () => {
    const query: QueryValorRangeDto = {
      valorMinimo: 1000,
      valorMaximo: 5000,
    };
    service.findByValorRange.mockResolvedValue([]);

    const res = await controller.findByValorRange(query);

    expect(service.findByValorRange).toHaveBeenCalledWith(query);
    expect(res).toEqual([]);
  });
});
