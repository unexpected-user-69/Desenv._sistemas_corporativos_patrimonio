import { Test } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController – desativar', () => {
  let controller: PatrimonioController;
  const service = { desativar: jest.fn() };
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

  it('PATCH /patrimonio/:id/desativar → delega ao service.desativar', async () => {
    const id = randomUUID();
    const mockPatrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.INATIVO,
    });
    service.desativar.mockResolvedValue(mockPatrimonio);

    const res = await controller.desativar(id);

    expect(service.desativar).toHaveBeenCalledWith(id);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    service.desativar.mockRejectedValue(
      new NotFoundException(`Patrimônio com ID "${id}" não encontrado`),
    );

    await expect(controller.desativar(id)).rejects.toThrow(NotFoundException);
    expect(service.desativar).toHaveBeenCalledWith(id);
  });

  it('should throw BadRequestException when patrimonio is already inactive', async () => {
    const id = randomUUID();
    service.desativar.mockRejectedValue(
      new BadRequestException('O patrimônio já está inativo'),
    );

    await expect(controller.desativar(id)).rejects.toThrow(BadRequestException);
  });
});
