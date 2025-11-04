import { CreatePatrimonioDto } from '../../src/patrimonio/dto/create-patrimonio.dto';
import { Patrimonio, PatrimonioStatus } from '../../src/patrimonio/entities/patrimonio.entity';
import { randomUUID } from 'crypto';

let patrimonioSeq = 1;

export function makeCreatePatrimonioDto(
  overrides?: Partial<CreatePatrimonioDto>,
): CreatePatrimonioDto {
  const base: CreatePatrimonioDto = {
    codigo: `PAT-2024-${String(patrimonioSeq).padStart(3, '0')}`,
    nome: `Patrimônio ${patrimonioSeq}`,
    descricao: `Descrição do patrimônio ${patrimonioSeq}`,
    status: PatrimonioStatus.ATIVO,
  };
  patrimonioSeq++;
  return { ...base, ...(overrides ?? {}) };
}

export function makePatrimonioEntity(
  overrides?: Partial<Patrimonio>,
): Partial<Patrimonio> {
  const dto = makeCreatePatrimonioDto();
  const base: Partial<Patrimonio> = {
    id: randomUUID(), // UUID
    codigo: dto.codigo,
    nome: dto.nome,
    descricao: dto.descricao,
    categoriaId: dto.categoriaId,
    status: dto.status ?? PatrimonioStatus.ATIVO,
    valorAquisicao: dto.valorAquisicao,
    dataAquisicao: dto.dataAquisicao
      ? new Date(dto.dataAquisicao)
      : undefined,
    dataGarantia: dto.dataGarantia ? new Date(dto.dataGarantia) : undefined,
    numeroSerie: dto.numeroSerie,
    modelo: dto.modelo,
    marca: dto.marca,
    localizacao: dto.localizacao,
    observacoes: dto.observacoes,
    fotoUrl: dto.fotoUrl,
    responsavelId: dto.responsavelId,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  };
  return { ...base, ...(overrides ?? {}) };
}

