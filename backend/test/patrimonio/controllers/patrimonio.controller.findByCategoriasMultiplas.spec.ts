import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { QueryCategoriasMultiplasDto } from '../../../src/patrimonio/dto/query-categorias-multiplas.dto';

describe('PatrimonioController – findByCategoriasMultiplas', () => {
  let controller: PatrimonioController;
  const service = { findByCategoriasMultiplas: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/categorias-multiplas → delega ao service.findByCategoriasMultiplas', async () => {
    const query: QueryCategoriasMultiplasDto = {
      categoriaIds: [
        '123e4567-e89b-12d3-a456-426614174000',
        '223e4567-e89b-12d3-a456-426614174001',
      ],
    };
    service.findByCategoriasMultiplas.mockResolvedValue([]);

    const res = await controller.findByCategoriasMultiplas(query);

    expect(service.findByCategoriasMultiplas).toHaveBeenCalledWith(query);
    expect(res).toEqual([]);
  });
});
