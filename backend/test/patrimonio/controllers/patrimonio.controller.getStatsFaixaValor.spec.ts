import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – getStatsFaixaValor', () => {
  let controller: PatrimonioController;
  const service = { getStatsFaixaValor: jest.fn() };
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

  it('GET /patrimonio/stats/faixa-valor → delega ao service.getStatsFaixaValor', async () => {
    const intervalo = 1000;
    const mockStats = {
      faixas: [
        { faixa: '0 - 1000', valorMinimo: 0, valorMaximo: 1000, quantidade: 5, valorTotal: 2500 },
        { faixa: '1000 - 2000', valorMinimo: 1000, valorMaximo: 2000, quantidade: 3, valorTotal: 4500 },
      ],
      intervalo: 1000,
    };
    service.getStatsFaixaValor.mockResolvedValue(mockStats);

    const res = await controller.getStatsFaixaValor(intervalo);

    expect(service.getStatsFaixaValor).toHaveBeenCalledWith(intervalo);
    expect(res).toEqual(mockStats);
  });

  it('should use default intervalo when not provided', async () => {
    const mockStats = {
      faixas: [],
      intervalo: 1000,
    };
    service.getStatsFaixaValor.mockResolvedValue(mockStats);

    const res = await controller.getStatsFaixaValor(undefined);

    expect(service.getStatsFaixaValor).toHaveBeenCalledWith(1000);
    expect(res).toEqual(mockStats);
  });
});
