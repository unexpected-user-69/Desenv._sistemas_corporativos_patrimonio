import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { TransferirResponsavelBulkDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/transferir-responsavel-bulk.dto';

describe('PatrimonioController – transferResponsavelBulk', () => {
  let controller: PatrimonioController;
  const service = { transferResponsavelBulk: jest.fn() };
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

  it('POST /patrimonio/bulk/transferir-responsavel ? delega ao service.transferResponsavelBulk', async () => {
    const dto: TransferirResponsavelBulkDto = {
      ids: [
        '123e4567-e89b-12d3-a456-426614174000',
        '223e4567-e89b-12d3-a456-426614174001',
      ],
      novoResponsavelId: '323e4567-e89b-12d3-a456-426614174002',
    };
    service.transferResponsavelBulk.mockResolvedValue({ transferidos: 2 });

    const res = await controller.transferResponsavelBulk(dto);

    expect(service.transferResponsavelBulk).toHaveBeenCalledWith(dto);
    expect(res).toEqual({ transferidos: 2 });
  });
});
