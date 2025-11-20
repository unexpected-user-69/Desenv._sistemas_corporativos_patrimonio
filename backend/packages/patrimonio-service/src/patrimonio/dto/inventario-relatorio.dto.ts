import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsEnum } from 'class-validator';

export enum FormatoRelatorio {
  PDF = 'pdf',
  CSV = 'csv',
  EXCEL = 'excel',
}

export class InventarioRelatorioDto {
  @ApiPropertyOptional({
    description: 'Data de referência para o inventário',
    example: '2025-01-27',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de referência deve ser uma data válida no formato ISO' })
  dataReferencia?: string;

  @ApiPropertyOptional({
    description: 'Formato do relatório',
    enum: FormatoRelatorio,
    example: FormatoRelatorio.PDF,
    default: FormatoRelatorio.PDF,
  })
  @IsOptional()
  @IsEnum(FormatoRelatorio, {
    message: 'O formato deve ser um dos valores válidos: pdf, csv, excel',
  })
  formato?: FormatoRelatorio;
}
