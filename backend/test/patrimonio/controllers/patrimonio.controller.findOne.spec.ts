import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { NotFoundException } from '@nestjs/common';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';

describe('PatrimonioController – findOne', () => {
  let controller: PatrimonioController;
  const service = { findOne: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },

        { provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService },
      ],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/:id → delega ao service.findOne', async () => {
    const id = randomUUID();
    const mockPatrimonio = makePatrimonioEntity({ id });
    service.findOne.mockResolvedValue(mockPatrimonio);

    const res = await controller.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    service.findOne.mockRejectedValue(
      new NotFoundException(`Patrimonio with ID "${id}" not found`),
    );

    await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });
});

