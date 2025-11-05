import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatrimonioController } from '../../../src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';
import { UpdateLocalizacaoPatrimonioDto } from '../../../src/patrimonio/dto/update-localizacao-patrimonio.dto';

describe('PatrimonioController – updateLocalizacao', () => {
  let controller: PatrimonioController;
  const service = { updateLocalizacao: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PatrimonioController],
      providers: [{ provide: PatrimonioService, useValue: service }],
    }).compile();
    controller = mod.get(PatrimonioController);
    jest.clearAllMocks();
  });

  it('PATCH /patrimonio/:id/localizacao → delega ao service.updateLocalizacao', async () => {
    const id = randomUUID();
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205 - Setor Financeiro',
    };
    const mockPatrimonio = makePatrimonioEntity({
      id,
      localizacao: dto.localizacao,
    });
    service.updateLocalizacao.mockResolvedValue(mockPatrimonio);

    const res = await controller.updateLocalizacao(id, dto);

    expect(service.updateLocalizacao).toHaveBeenCalledWith(id, dto);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    const dto: UpdateLocalizacaoPatrimonioDto = {
      localizacao: 'Sala 205',
    };
    service.updateLocalizacao.mockRejectedValue(
      new NotFoundException(`Patrimônio com ID "${id}" não encontrado`),
    );

    await expect(controller.updateLocalizacao(id, dto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
