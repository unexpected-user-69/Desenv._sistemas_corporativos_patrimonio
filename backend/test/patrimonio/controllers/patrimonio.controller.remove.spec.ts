import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { randomUUID } from 'crypto';

describe('PatrimonioController – remove', () => {
  let controller: PatrimonioController;
  const service = { remove: jest.fn() };
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

  it('DELETE /patrimonio/:id → delega ao service.remove', async () => {
    const id = randomUUID();
    service.remove.mockResolvedValue(undefined);

    await controller.remove(id);

    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    service.remove.mockRejectedValue(
      new NotFoundException(`Patrimonio with ID "${id}" not found`),
    );

    await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});

