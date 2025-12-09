import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { PatrimonioStatus } from '../../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController � ativar', () => {
  let controller: PatrimonioController;
  const service = { ativar: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService },
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },
      ],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('PATCH /patrimonio/:id/ativar ? delega ao service.ativar', async () => {
    const id = randomUUID();
    const mockPatrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.ATIVO,
    });
    service.ativar.mockResolvedValue(mockPatrimonio);

    const res = await controller.ativar(id);

    expect(service.ativar).toHaveBeenCalledWith(id);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    service.ativar.mockRejectedValue(
      new NotFoundException(`Patrim�nio com ID "${id}" n�o encontrado`),
    );

    await expect(controller.ativar(id)).rejects.toThrow(NotFoundException);
    expect(service.ativar).toHaveBeenCalledWith(id);
  });

  it('should throw BadRequestException when patrimonio is already active', async () => {
    const id = randomUUID();
    service.ativar.mockRejectedValue(
      new BadRequestException('O patrim�nio j� est� ativo'),
    );

    await expect(controller.ativar(id)).rejects.toThrow(BadRequestException);
  });
});
