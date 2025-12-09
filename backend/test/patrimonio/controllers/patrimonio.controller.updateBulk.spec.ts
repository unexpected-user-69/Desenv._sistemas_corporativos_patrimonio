import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { UpdateBulkPatrimonioDto } from '../../../src/patrimonio/dto/update-bulk-patrimonio.dto';

describe('PatrimonioController – updateBulk', () => {
  let controller: PatrimonioController;
  const service = { updateBulk: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService },
      ],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('PATCH /patrimonio/bulk → delega ao service.updateBulk', async () => {
    const dto: UpdateBulkPatrimonioDto = {
      ids: ['123e4567-e89b-12d3-a456-426614174000'],
      dados: { localizacao: 'Sala 205' },
    };
    service.updateBulk.mockResolvedValue({ atualizados: 1 });

    const res = await controller.updateBulk(dto);

    expect(service.updateBulk).toHaveBeenCalledWith(dto);
    expect(res).toEqual({ atualizados: 1 });
  });
});
