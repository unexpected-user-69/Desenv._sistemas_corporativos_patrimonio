import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';

describe('PatrimonioController – getStatsLocalizacoes', () => {
  let controller: PatrimonioController;
  const service = { getStatsLocalizacoes: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/stats/localizacoes → delega ao service.getStatsLocalizacoes', async () => {
    const mockStats = {
      localizacoes: [
        { localizacao: 'Sala 205', quantidade: 10, valorTotal: 50000 },
        { localizacao: 'Sala 101', quantidade: 5, valorTotal: 25000 },
      ],
      totalLocalizacoes: 2,
    };
    service.getStatsLocalizacoes.mockResolvedValue(mockStats);

    const res = await controller.getStatsLocalizacoes();

    expect(service.getStatsLocalizacoes).toHaveBeenCalled();
    expect(res).toEqual(mockStats);
  });
});
