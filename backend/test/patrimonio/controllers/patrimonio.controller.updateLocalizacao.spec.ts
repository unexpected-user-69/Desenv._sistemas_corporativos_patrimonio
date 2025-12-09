import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UpdateLocalizacaoPatrimonioDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/update-localizacao-patrimonio.dto';

describe('PatrimonioController – updateLocalizacao', () => {
  let controller: PatrimonioController;
  const service = { updateLocalizacao: jest.fn() };
  const pdfExportService = { generatePdf: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [
        { provide: 'Reflector', useValue: { getAllAndOverride: jest.fn() } },

        { provide: PatrimonioService, useValue: service },
        { provide: PatrimonioPdfExportService, useValue: pdfExportService },
      ],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('PATCH /patrimonio/:id/localizacao ? delega ao service.updateLocalizacao', async () => {
    const id = randomUUID();
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205 - Setor Financeiro',
    };
    const mockPatrimonio = makePatrimonioEntity({
      id,
      localizacao: dto.localizacao,
    });
    const req = { user: { sub: 'user-id' } };
    service.updateLocalizacao.mockResolvedValue(mockPatrimonio);

    const res = await controller.updateLocalizacao(id, dto, req);

    expect(service.updateLocalizacao).toHaveBeenCalledWith(id, dto, 'user-id');
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205',
    };
    const req = { user: { sub: 'user-id' } };
    service.updateLocalizacao.mockRejectedValue(
      new NotFoundException(`Patrimônio com ID "${id}" não encontrado`),
    );

    await expect(controller.updateLocalizacao(id, dto, req)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.updateLocalizacao).toHaveBeenCalledWith(id, dto, 'user-id');
  });
});
