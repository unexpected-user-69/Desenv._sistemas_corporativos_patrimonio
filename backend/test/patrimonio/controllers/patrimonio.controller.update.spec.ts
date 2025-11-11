import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { UpdatePatrimonioDto } from '../../../src/patrimonio/dto/update-patrimonio.dto';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';

describe('PatrimonioController – update', () => {
  let controller: PatrimonioController;
  const service = { update: jest.fn() };
  const pdfExportService = {};

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

  it('PATCH /patrimonio/:id → delega ao service.update', async () => {
    const id = randomUUID();
    const dto: UpdatePatrimonioDto = { nome: 'Nome Atualizado' };
    const mockPatrimonio = makePatrimonioEntity({ id, nome: dto.nome });
    const req = { user: { sub: 'user-id' } };
    service.update.mockResolvedValue(mockPatrimonio);

    const res = await controller.update(id, dto, req);

    expect(service.update).toHaveBeenCalledWith(id, dto, 'user-id');
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    const dto: UpdatePatrimonioDto = { nome: 'Nome Atualizado' };
    const req = { user: { sub: 'user-id' } };
    service.update.mockRejectedValue(
      new NotFoundException(`Patrimonio with ID "${id}" not found`),
    );

    await expect(controller.update(id, dto, req)).rejects.toThrow(NotFoundException);
    expect(service.update).toHaveBeenCalledWith(id, dto, 'user-id');
  });
});

