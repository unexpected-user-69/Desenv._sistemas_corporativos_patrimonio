import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – getStatsEvolucao', () => {
  let controller: PatrimonioController;
  const service = { getStatsEvolucao: jest.fn() };
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

  it('GET /patrimonio/stats/evolucao → delega ao service.getStatsEvolucao', async () => {
    const periodo = 'mensal';
    const ano = 2025;
    const mockStats = {
      evolucao: [
        { periodo: '2025-01', quantidade: 5, valor: 25000 },
        { periodo: '2025-02', quantidade: 3, valor: 15000 },
      ],
      tipoPeriodo: 'mensal',
    };
    service.getStatsEvolucao.mockResolvedValue(mockStats);

    const res = await controller.getStatsEvolucao(periodo, ano);

    expect(service.getStatsEvolucao).toHaveBeenCalledWith('mensal', 2025);
    expect(res).toEqual(mockStats);
  });

  it('should use default periodo when not provided', async () => {
    const mockStats = {
      evolucao: [],
      tipoPeriodo: 'mensal',
    };
    service.getStatsEvolucao.mockResolvedValue(mockStats);

    const res = await controller.getStatsEvolucao(undefined, undefined);

    expect(service.getStatsEvolucao).toHaveBeenCalledWith('mensal', undefined);
    expect(res.tipoPeriodo).toBe('mensal');
  });

  it('should handle ano parameter', async () => {
    const periodo = 'anual';
    const ano = 2024;
    const mockStats = {
      evolucao: [],
      tipoPeriodo: 'anual',
    };
    service.getStatsEvolucao.mockResolvedValue(mockStats);

    const res = await controller.getStatsEvolucao(periodo, ano);

    expect(service.getStatsEvolucao).toHaveBeenCalledWith('anual', 2024);
    expect(res.tipoPeriodo).toBe('anual');
  });
});
