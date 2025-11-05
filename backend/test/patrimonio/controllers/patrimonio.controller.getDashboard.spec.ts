import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { DashboardResponseDto } from '../../../src/patrimonio/dto/dashboard-response.dto';

describe('PatrimonioController – getDashboard', () => {
  let controller: PatrimonioController;
  const service = { getDashboard: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/dashboard → delega ao service.getDashboard', async () => {
    const mockDashboard: DashboardResponseDto = {
      total: 1000,
      valorTotal: 5000000,
      porStatus: {
        ATIVO: 800,
        MANUTENCAO: 50,
        DESCARTADO: 150,
      },
      porCategoria: {
        'cat-1': 300,
        'cat-2': 200,
      },
      garantiasVencendo: 15,
      emManutencao: 8,
      novosUltimoMes: 25,
    };

    service.getDashboard.mockResolvedValue(mockDashboard);

    const res = await controller.getDashboard();

    expect(service.getDashboard).toHaveBeenCalled();
    expect(res).toEqual(mockDashboard);
  });

  it('should return empty metrics when no data exists', async () => {
    const mockDashboard: DashboardResponseDto = {
      total: 0,
      valorTotal: 0,
      porStatus: {},
      porCategoria: {},
      garantiasVencendo: 0,
      emManutencao: 0,
      novosUltimoMes: 0,
    };

    service.getDashboard.mockResolvedValue(mockDashboard);

    const res = await controller.getDashboard();

    expect(res).toEqual(mockDashboard);
  });
});

