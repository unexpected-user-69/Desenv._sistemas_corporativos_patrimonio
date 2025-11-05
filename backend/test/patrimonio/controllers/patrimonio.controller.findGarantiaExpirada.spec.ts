import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';

describe('PatrimonioController – findGarantiaExpirada', () => {
  let controller: PatrimonioController;
  const service = { findGarantiaExpirada: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/garantia-expirada → delega ao service.findGarantiaExpirada', async () => {
    const dias = 30;
    service.findGarantiaExpirada.mockResolvedValue([]);

    const res = await controller.findGarantiaExpirada(dias);

    expect(service.findGarantiaExpirada).toHaveBeenCalledWith(dias || 0);
    expect(res).toEqual([]);
  });

  it('should use default dias = 0 when not provided', async () => {
    service.findGarantiaExpirada.mockResolvedValue([]);

    const res = await controller.findGarantiaExpirada(undefined);

    expect(service.findGarantiaExpirada).toHaveBeenCalledWith(0);
    expect(res).toEqual([]);
  });
});
