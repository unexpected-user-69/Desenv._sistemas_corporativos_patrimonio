import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryStatusMultiplosDto } from '../../../src/patrimonio/dto/query-status-multiplos.dto';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController – findByStatusMultiplos', () => {
  let controller: PatrimonioController;
  const service = { findByStatusMultiplos: jest.fn() };
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

  it('GET /patrimonio/status-multiplos → delega ao service.findByStatusMultiplos', async () => {
    const query: QueryStatusMultiplosDto = {
      status: [PatrimonioStatus.ATIVO, PatrimonioStatus.MANUTENCAO],
    };
    service.findByStatusMultiplos.mockResolvedValue([]);

    const res = await controller.findByStatusMultiplos(query);

    expect(service.findByStatusMultiplos).toHaveBeenCalledWith(query);
    expect(res).toEqual([]);
  });
});
