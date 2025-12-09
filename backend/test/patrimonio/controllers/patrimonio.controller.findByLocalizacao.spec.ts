import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';

describe('PatrimonioController – findByLocalizacao', () => {
  let controller: PatrimonioController;
  const service = { findByLocalizacao: jest.fn() };
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

  it('GET /patrimonio/localizacao/:localizacao → delega ao service.findByLocalizacao', async () => {
    const localizacao = 'Sala 205';
    const mockPatrimonios = [
      makePatrimonioEntity({ localizacao: 'Sala 205 - Setor Financeiro' }),
      makePatrimonioEntity({ localizacao: 'Sala 205 - Setor Administrativo' }),
    ];
    service.findByLocalizacao.mockResolvedValue(mockPatrimonios);

    const res = await controller.findByLocalizacao(localizacao);

    expect(service.findByLocalizacao).toHaveBeenCalledWith(localizacao);
    expect(res).toEqual(mockPatrimonios);
  });
});
