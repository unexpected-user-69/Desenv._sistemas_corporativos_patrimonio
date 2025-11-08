import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ReportType, ReportModel } from '../entities/report-request.entity';

export class CreateReportRequestDto {
  @ApiProperty({
    description: 'Tipo de relatório',
    enum: ReportType,
    example: ReportType.CSV,
  })
  @IsEnum(ReportType)
  type!: ReportType;

  @ApiProperty({
    description: 'Modelo de relatório',
    enum: ReportModel,
    example: ReportModel.PATRIMONIO,
  })
  @IsEnum(ReportModel)
  model!: ReportModel;

  @ApiProperty({
    description: 'Filtros para o relatório (JSON)',
    example: { status: 'ATIVO', categoriaId: '123e4567-e89b-12d3-a456-426614174000' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Chave do catálogo de relatório (opcional - se fornecido, usa dados do catálogo)',
    example: 'patrimonio-inventario-completo',
  })
  @IsOptional()
  @IsString()
  catalogKey?: string;
}



