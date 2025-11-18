import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';

describe('PatrimonioController – findManutencaoProlongada', () => {
  let controller: PatrimonioController;
  const service = { findManutencaoProlongada: jest.fn() };
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

  it('GET /patrimonio/manutencao-prolongada → delega ao service.findManutencaoProlongada com dias padrão', async () => {
    service.findManutencaoProlongada.mockResolvedValue([]);

    const res = await controller.findManutencaoProlongada();

    expect(service.findManutencaoProlongada).toHaveBeenCalledWith(90);
    expect(res).toEqual([]);
  });

  it('GET /patrimonio/manutencao-prolongada?dias=120 → delega ao service.findManutencaoProlongada com dias customizado', async () => {
    service.findManutencaoProlongada.mockResolvedValue([]);

    const res = await controller.findManutencaoProlongada(120);

    expect(service.findManutencaoProlongada).toHaveBeenCalledWith(120);
    expect(res).toEqual([]);
  });
});
