import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { QueryPatrimonioDto } from '../../../src/patrimonio/dto/query-patrimonio.dto';
import { InventarioRelatorioDto } from '../../../src/patrimonio/dto/inventario-relatorio.dto';

describe('PatrimonioController – gerarRelatorioInventario', () => {
  let controller: PatrimonioController;
  const service = { gerarRelatorioInventario: jest.fn() };
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockResponse = {
      setHeader: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/relatorio/inventario → delega ao service.gerarRelatorioInventario', async () => {
    const query: QueryPatrimonioDto & InventarioRelatorioDto = {};
    service.gerarRelatorioInventario.mockResolvedValue(undefined);

    await controller.gerarRelatorioInventario(query, mockResponse as Response);

    expect(service.gerarRelatorioInventario).toHaveBeenCalledWith(query, mockResponse);
  });

  it('should pass query parameters to service', async () => {
    const query: QueryPatrimonioDto & InventarioRelatorioDto = { q: 'test' };
    service.gerarRelatorioInventario.mockResolvedValue(undefined);

    await controller.gerarRelatorioInventario(query, mockResponse as Response);

    expect(service.gerarRelatorioInventario).toHaveBeenCalledWith(query, mockResponse);
  });
});
