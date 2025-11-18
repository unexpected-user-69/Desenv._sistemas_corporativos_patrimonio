import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { randomUUID } from 'crypto';

describe('PatrimonioController – getHistorico', () => {
  let controller: PatrimonioController;
  const service = { getHistorico: jest.fn() };
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

  it('GET /patrimonio/:id/historico → delega ao service.getHistorico', async () => {
    const id = randomUUID();
    const mockHistorico = {
      patrimonioId: id,
      historico: [],
      total: 0,
    };
    service.getHistorico.mockResolvedValue(mockHistorico);

    const res = await controller.getHistorico(id);

    expect(service.getHistorico).toHaveBeenCalledWith(id);
    expect(res).toEqual(mockHistorico);
  });
});
