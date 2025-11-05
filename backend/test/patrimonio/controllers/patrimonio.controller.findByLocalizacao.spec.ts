import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';

describe('PatrimonioController – findByLocalizacao', () => {
  let controller: PatrimonioController;
  const service = { findByLocalizacao: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
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
