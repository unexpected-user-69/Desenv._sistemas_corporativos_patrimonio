import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { DescartePatrimonioDto } from '../../../src/patrimonio/dto/descarte-patrimonio.dto';
import { PatrimonioStatus } from '../../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController – descartar', () => {
  let controller: PatrimonioController;
  const service = { marcarDescarte: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };;

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

  it('POST /patrimonio/:id/descarte → delega ao service.marcarDescarte', async () => {
    const id = randomUUID();
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
      destinoDescarte: 'Leilão público',
    };
    const mockPatrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.DESCARTADO,
    });
    service.marcarDescarte.mockResolvedValue(mockPatrimonio);

    const res = await controller.descartar(id, dto);

    expect(service.marcarDescarte).toHaveBeenCalledWith(id, dto);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
    };
    service.marcarDescarte.mockRejectedValue(
      new NotFoundException(`Patrimônio com ID "${id}" não encontrado`),
    );

    await expect(controller.descartar(id, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.marcarDescarte).toHaveBeenCalledWith(id, dto);
  });

  it('should handle descarte without destinoDescarte', async () => {
    const id = randomUUID();
    const dto: DescartePatrimonioDto = {
      dataDescarte: '2025-12-31',
      motivoDescarte: 'Equipamento obsoleto',
    };
    const mockPatrimonio = makePatrimonioEntity({
      id,
      status: PatrimonioStatus.DESCARTADO,
    });
    service.marcarDescarte.mockResolvedValue(mockPatrimonio);

    const res = await controller.descartar(id, dto);

    expect(res.status).toBe(PatrimonioStatus.DESCARTADO);
  });
});
