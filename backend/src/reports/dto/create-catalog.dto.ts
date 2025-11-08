import { IsString, IsEnum, IsOptional, IsObject, IsBoolean, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportType, ReportModel } from '../entities/report-request.entity';

export class CreateCatalogDto {
  @ApiProperty({
    description: 'Chave única do relatório (ex: patrimonio-inventario-completo)',
    example: 'patrimonio-inventario-completo',
    maxLength: 100,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  key!: string;

  @ApiProperty({
    description: 'Nome do relatório',
    example: 'Inventário Completo de Patrimônio',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional({
    description: 'Descrição do relatório',
    example: 'Relatório completo listando todos os patrimônios com suas informações detalhadas',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Tipo de relatório',
    enum: ReportType,
    example: ReportType.PDF,
  })
  @IsEnum(ReportType)
  type!: ReportType;

  @ApiProperty({
    description: 'Modelo de dados do relatório',
    enum: ReportModel,
    example: ReportModel.PATRIMONIO,
  })
  @IsEnum(ReportModel)
  model!: ReportModel;

  @ApiPropertyOptional({
    description: 'Filtros padrão do relatório',
    example: { status: 'ATIVO' },
  })
  @IsOptional()
  @IsObject()
  defaultFilters?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Versão inicial do relatório',
    example: '1.0.0',
    default: '1.0.0',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  currentVersion?: string;

  @ApiPropertyOptional({
    description: 'Se o relatório está ativo',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({
    description: 'Se o relatório requer permissões especiais',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  requiresPermission?: boolean;
}

