import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – getHistoricoPorResponsavel', () => {
  let controller: PatrimonioController;
  const service = { getHistoricoPorResponsavel: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: 'Reflector', useValue: { getAllAndOverride: jest.fn() } },
{ provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/responsavel/:id/historico → delega ao service.getHistoricoPorResponsavel', async () => {
    const responsavelId = '123e4567-e89b-12d3-a456-426614174000';
    service.getHistoricoPorResponsavel.mockResolvedValue([]);

    const res = await controller.getHistoricoPorResponsavel(responsavelId);

    expect(service.getHistoricoPorResponsavel).toHaveBeenCalledWith(responsavelId);
    expect(res).toEqual([]);
  });
});
