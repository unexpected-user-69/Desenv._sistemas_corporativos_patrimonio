import { Test } from '@nestjs/testing';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../src/patrimonio/services/patrimonio-pdf-export.service';
import { VerificarDuplicidadeDto } from '../../../src/patrimonio/dto/verificar-duplicidade.dto';

describe('PatrimonioController – verificarDuplicidade', () => {
  let controller: PatrimonioController;
  const service = { verificarDuplicidade: jest.fn() };
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

  it('POST /patrimonio/verificar-duplicidade → delega ao service.verificarDuplicidade', async () => {
    const dto: VerificarDuplicidadeDto = {
      marca: 'Dell',
      modelo: 'Inspiron 15',
      numeroSerie: 'DL123456',
    };
    service.verificarDuplicidade.mockResolvedValue({
      temDuplicatas: false,
      duplicatas: [],
    });

    const res = await controller.verificarDuplicidade(dto);

    expect(service.verificarDuplicidade).toHaveBeenCalledWith(dto);
    expect(res).toBeDefined();
  });
});
