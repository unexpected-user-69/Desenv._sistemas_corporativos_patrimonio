import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';

describe('PatrimonioController – findByNumeroSerie', () => {
  let controller: PatrimonioController;
  const service = { findByNumeroSerie: jest.fn() };
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

  it('GET /patrimonio/numero-serie/:numeroSerie → delega ao service.findByNumeroSerie', async () => {
    const numeroSerie = 'DL123456';
    const mockPatrimonio = makePatrimonioEntity({ numeroSerie });
    service.findByNumeroSerie.mockResolvedValue(mockPatrimonio);

    const res = await controller.findByNumeroSerie(numeroSerie);

    expect(service.findByNumeroSerie).toHaveBeenCalledWith(numeroSerie);
    expect(res).toEqual(mockPatrimonio);
  });
});
