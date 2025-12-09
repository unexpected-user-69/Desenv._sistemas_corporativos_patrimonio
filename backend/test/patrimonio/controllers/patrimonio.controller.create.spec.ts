import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { makeCreatePatrimonioDto } from '../../factories/patrimonio.factory';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';

describe('PatrimonioController – create', () => {
  let controller: PatrimonioController;
  const service = { create: jest.fn() };
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

  it('POST /patrimonio → delega ao service.create', async () => {
    const dto = makeCreatePatrimonioDto();
    const mockPatrimonio = makePatrimonioEntity({
      codigo: dto.codigo,
      nome: dto.nome,
      descricao: dto.descricao,
      categoriaId: dto.categoriaId,
      status: dto.status,
      id: randomUUID(),
    });
    service.create.mockResolvedValue(mockPatrimonio);

    const res = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(res).toEqual(mockPatrimonio);
  });
});

