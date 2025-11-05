import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';

describe('PatrimonioController – validarCodigo', () => {
  let controller: PatrimonioController;
  const service = { validarCodigo: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('GET /patrimonio/validar-codigo/:codigo → delega ao service.validarCodigo', async () => {
    const codigo = 'PAT-001';
    service.validarCodigo.mockResolvedValue({ disponivel: true });

    const res = await controller.validarCodigo(codigo);

    expect(service.validarCodigo).toHaveBeenCalledWith(codigo);
    expect(res).toEqual({ disponivel: true });
  });
});
