import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – validarCodigo', () => {
  let controller: PatrimonioController;
  const service = { validarCodigo: jest.fn() };
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

  it('GET /patrimonio/validar-codigo/:codigo → delega ao service.validarCodigo', async () => {
    const codigo = 'PAT-001';
    service.validarCodigo.mockResolvedValue({ disponivel: true });

    const res = await controller.validarCodigo(codigo);

    expect(service.validarCodigo).toHaveBeenCalledWith(codigo);
    expect(res).toEqual({ disponivel: true });
  });
});
