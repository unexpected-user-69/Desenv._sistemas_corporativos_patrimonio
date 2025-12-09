import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { QueryCategoriasMultiplasDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/query-categorias-multiplas.dto';

describe('PatrimonioController – findByCategoriasMultiplas', () => {
  let controller: PatrimonioController;
  const service = { findByCategoriasMultiplas: jest.fn() };
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

  it('GET /patrimonio/categorias-multiplas ? delega ao service.findByCategoriasMultiplas', async () => {
    const query: QueryCategoriasMultiplasDto = {
      categoriaIds: [
        '123e4567-e89b-12d3-a456-426614174000',
        '223e4567-e89b-12d3-a456-426614174001',
      ],
    };
    service.findByCategoriasMultiplas.mockResolvedValue([]);

    const res = await controller.findByCategoriasMultiplas(query);

    expect(service.findByCategoriasMultiplas).toHaveBeenCalledWith(query);
    expect(res).toEqual([]);
  });
});
