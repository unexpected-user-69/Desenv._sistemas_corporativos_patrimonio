import { Test } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { UpdateStatusPatrimonioDto } from '../../../src/patrimonio/dto/update-status-patrimonio.dto';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController – updateStatus', () => {
  let controller: PatrimonioController;
  const service = { updateStatus: jest.fn() };
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

  it('PATCH /patrimonio/:id/status → delega ao service.updateStatus', async () => {
    const id = randomUUID();
    const dto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.MANUTENCAO,
      observacoes: 'Enviado para manutenção preventiva',
    };
    const mockPatrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.MANUTENCAO,
    });
    service.updateStatus.mockResolvedValue(mockPatrimonio);

    const res = await controller.updateStatus(id, dto);

    expect(service.updateStatus).toHaveBeenCalledWith(id, dto);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    const dto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.MANUTENCAO,
    };
    service.updateStatus.mockRejectedValue(
      new NotFoundException(`Patrimônio com ID "${id}" não encontrado`),
    );

    await expect(controller.updateStatus(id, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.updateStatus).toHaveBeenCalledWith(id, dto);
  });

  it('should throw BadRequestException when status is already the same', async () => {
    const id = randomUUID();
    const dto: UpdateStatusPatrimonioDto = {
      status: PatrimonioStatus.MANUTENCAO,
    };
    service.updateStatus.mockRejectedValue(
      new BadRequestException(
        `O patrimônio já possui o status "${PatrimonioStatus.MANUTENCAO}"`,
      ),
    );

    await expect(controller.updateStatus(id, dto)).rejects.toThrow(
      BadRequestException,
    );
  });
});

