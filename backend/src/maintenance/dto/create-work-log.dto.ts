import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min, Matches } from 'class-validator';
import { WorkLogType } from '../entities/work-log.entity';

export class CreateWorkLogDto {
  @ApiProperty({ description: 'ID da OS', format: 'uuid' })
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'workOrderId deve ser um UUID válido',
  })
  workOrderId!: string;

  @ApiProperty({
    description: 'Tipo de apontamento',
    enum: WorkLogType,
    default: WorkLogType.TRABALHO,
  })
  @IsEnum(WorkLogType)
  tipo!: WorkLogType;

  @ApiProperty({ description: 'Horas trabalhadas', example: 2.5 })
  @IsNumber({}, { message: 'horas deve ser um número' })
  @Min(0, { message: 'horas deve ser maior ou igual a 0' })
  horas!: number;

  @ApiPropertyOptional({ description: 'Custo do apontamento', example: 150.0 })
  @IsOptional()
  @IsNumber({}, { message: 'custo deve ser um número' })
  @Min(0, { message: 'custo deve ser maior ou igual a 0' })
  custo?: number;

  @ApiPropertyOptional({ description: 'Observações' })
  @IsOptional()
  @IsString()
  observacao?: string;
}

