import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ExecutionStatus, ExecutionType } from '../entities/execution.entity';

export class ListExecutionsDto {
  @ApiPropertyOptional({
    description: 'Filtrar por chave do conector',
    example: 'sap',
  })
  @IsOptional()
  @IsString()
  connectorKey?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por status',
    enum: ExecutionStatus,
    example: ExecutionStatus.SUCCESS,
  })
  @IsOptional()
  @IsEnum(ExecutionStatus)
  status?: ExecutionStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo',
    enum: ExecutionType,
    example: ExecutionType.IMPORT,
  })
  @IsOptional()
  @IsEnum(ExecutionType)
  type?: ExecutionType;

  @ApiPropertyOptional({
    description: 'Número da página',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Limite de itens por página',
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class PaginatedExecutionsResponseDto {
  @ApiProperty({ description: 'Lista de execuções', type: [Object] })
  items!: any[];

  @ApiProperty({ description: 'Página atual', example: 1 })
  page!: number;

  @ApiProperty({ description: 'Limite por página', example: 20 })
  limit!: number;

  @ApiProperty({ description: 'Total de registros', example: 100 })
  total!: number;
}

