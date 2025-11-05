import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { QueryAquisicaoPeriodoDto } from '../../../src/patrimonio/dto/query-aquisicao-periodo.dto';

describe('PatrimonioController – findByAquisicaoPeriodo', () => {
  let controller: PatrimonioController;
  const service = { findByAquisicaoPeriodo: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/aquisicao-periodo → delega ao service.findByAquisicaoPeriodo', async () => {
    const query: QueryAquisicaoPeriodoDto = {
      dataInicial: '2024-01-01',
      dataFinal: '2024-12-31',
    };
    service.findByAquisicaoPeriodo.mockResolvedValue([]);

    const res = await controller.findByAquisicaoPeriodo(query);

    expect(service.findByAquisicaoPeriodo).toHaveBeenCalledWith(query);
    expect(res).toEqual([]);
  });
});
