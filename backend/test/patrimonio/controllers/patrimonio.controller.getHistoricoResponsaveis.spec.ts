import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – getHistoricoResponsaveis', () => {
  let controller: PatrimonioController;
  const service = { getHistoricoResponsaveis: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },
{ provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/:id/historico/responsaveis → delega ao service.getHistoricoResponsaveis', async () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    service.getHistoricoResponsaveis.mockResolvedValue({
      patrimonioId: id,
      historico: [],
    });

    const res = await controller.getHistoricoResponsaveis(id);

    expect(service.getHistoricoResponsaveis).toHaveBeenCalledWith(id);
    expect(res).toBeDefined();
  });
});
