import { Test } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PatrimonioController } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.controller';
import { PatrimonioService } from '../../../packages/patrimonio-service/src/patrimonio/patrimonio.service';
import { PatrimonioPdfExportService } from '../../../packages/patrimonio-service/src/patrimonio/services/patrimonio-pdf-export.service';
import { TransferirResponsavelDto } from '../../../packages/patrimonio-service/src/patrimonio/dto/transferir-responsavel.dto';
import { makePatrimonioEntity } from '../../factories/patrimonio.factory';
import { randomUUID } from 'crypto';

describe('PatrimonioController – transferResponsavel', () => {
  let controller: PatrimonioController;
  const service = { transferResponsavel: jest.fn() };
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

  it('POST /patrimonio/:id/transferir-responsavel ? delega ao service.transferResponsavel', async () => {
    const id = randomUUID();
    const novoResponsavelId = randomUUID();
    const dto: TransferirResponsavelDto = {
      novoResponsavelId,
      observacoes: 'Transferência de setor',
    };
    const mockPatrimonio = makePatrimonioEntity({
      id,
      responsavelId: novoResponsavelId,
    });
    service.transferResponsavel.mockResolvedValue(mockPatrimonio);

    const res = await controller.transferResponsavel(id, dto);

    expect(service.transferResponsavel).toHaveBeenCalledWith(id, dto);
    expect(res).toEqual(mockPatrimonio);
  });

  it('should throw NotFoundException when patrimonio not found', async () => {
    const id = randomUUID();
    const dto: TransferirResponsavelDto = {
      novoResponsavelId: randomUUID(),
    };
    service.transferResponsavel.mockRejectedValue(
      new NotFoundException(`Patrimônio com ID "${id}" não encontrado`),
    );

    await expect(controller.transferResponsavel(id, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.transferResponsavel).toHaveBeenCalledWith(id, dto);
  });

  it('should throw NotFoundException when novo responsavel not found', async () => {
    const id = randomUUID();
    const novoResponsavelId = randomUUID();
    const dto: TransferirResponsavelDto = {
      novoResponsavelId,
    };
    service.transferResponsavel.mockRejectedValue(
      new NotFoundException(
        `Usuário com ID "${novoResponsavelId}" não encontrado`,
      ),
    );

    await expect(controller.transferResponsavel(id, dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException when same responsavel', async () => {
    const id = randomUUID();
    const dto: TransferirResponsavelDto = {
      novoResponsavelId: randomUUID(),
    };
    service.transferResponsavel.mockRejectedValue(
      new BadRequestException(
        'O patrimônio já está atribuído a este responsável',
      ),
    );

    await expect(controller.transferResponsavel(id, dto)).rejects.toThrow(
      BadRequestException,
    );
  });
});

