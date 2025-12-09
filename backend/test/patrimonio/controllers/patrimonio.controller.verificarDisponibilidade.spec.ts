import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { randomUUID } from 'crypto';

describe('PatrimonioController – verificarDisponibilidade', () => {
  let controller: PatrimonioController;
  const service = { verificarDisponibilidade: jest.fn() };
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

  it('GET /patrimonio/:id/disponibilidade → delega ao service.verificarDisponibilidade', async () => {
    const id = randomUUID();
    service.verificarDisponibilidade.mockResolvedValue({ disponivel: true });

    const res = await controller.verificarDisponibilidade(id);

    expect(service.verificarDisponibilidade).toHaveBeenCalledWith(id);
    expect(res).toEqual({ disponivel: true });
  });
});
