import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { CreateBulkPatrimonioDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/create-bulk-patrimonio.dto';
import { makeCreatePatrimonioDto } from '../../factories/patrimonio.factory';

describe('PatrimonioController – createBulk', () => {
  let controller: PatrimonioController;
  const service = { createBulkWithTransaction: jest.fn() };
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

  it('POST /patrimonio/bulk ? delega ao service.createBulkWithTransaction', async () => {
    const dto: CreateBulkPatrimonioDto = {
      patrimonios: [makeCreatePatrimonioDto()],
    };
    service.createBulkWithTransaction.mockResolvedValue({
      sucessos: [],
      erros: [],
      totalSucessos: 0,
      totalErros: 0,
    });

    const res = await controller.createBulk(dto);

    expect(service.createBulkWithTransaction).toHaveBeenCalledWith(dto);
    expect(res).toBeDefined();
  });
});
