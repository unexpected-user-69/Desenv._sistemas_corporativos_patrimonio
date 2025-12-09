import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryAquisicaoPeriodoDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/query-aquisicao-periodo.dto';

describe('PatrimonioController – findByAquisicaoPeriodo', () => {
  let controller: PatrimonioController;
  const service = { findByAquisicaoPeriodo: jest.fn() };
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

  it('GET /patrimonio/aquisicao-periodo ? delega ao service.findByAquisicaoPeriodo', async () => {
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
