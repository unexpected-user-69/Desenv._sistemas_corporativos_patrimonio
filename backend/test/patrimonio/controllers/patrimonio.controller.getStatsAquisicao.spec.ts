import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – getStatsAquisicao', () => {
  let controller: PatrimonioController;
  const service = { getStatsAquisicao: jest.fn() };
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

  it('GET /patrimonio/stats/aquisicao → delega ao service.getStatsAquisicao', async () => {
    const periodo = 'mensal';
    const mockStats = {
      periodos: [
        {
          periodo: '2025-01',
          dataInicial: '2025-01-01',
          dataFinal: '2025-01-31',
          quantidade: 10,
          valorTotal: 50000,
        },
      ],
      tipoPeriodo: 'mensal',
    };
    service.getStatsAquisicao.mockResolvedValue(mockStats);

    const res = await controller.getStatsAquisicao(periodo);

    expect(service.getStatsAquisicao).toHaveBeenCalledWith(periodo);
    expect(res).toEqual(mockStats);
  });

  it('should use default periodo when not provided', async () => {
    const mockStats = {
      periodos: [],
      tipoPeriodo: 'mensal',
    };
    service.getStatsAquisicao.mockResolvedValue(mockStats);

    const res = await controller.getStatsAquisicao(undefined);

    expect(service.getStatsAquisicao).toHaveBeenCalledWith('mensal');
    expect(res).toEqual(mockStats);
  });

  it('should handle trimestral periodo', async () => {
    const periodo = 'trimestral';
    const mockStats = {
      periodos: [],
      tipoPeriodo: 'trimestral',
    };
    service.getStatsAquisicao.mockResolvedValue(mockStats);

    const res = await controller.getStatsAquisicao(periodo);

    expect(service.getStatsAquisicao).toHaveBeenCalledWith('trimestral');
    expect(res.tipoPeriodo).toBe('trimestral');
  });
});
