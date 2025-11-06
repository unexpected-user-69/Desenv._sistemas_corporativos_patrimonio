import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, Matches } from 'class-validator';
import { Periodicidade } from '../entities/maintenance-plan.entity';

export class CreateMaintenancePlanDto {
  @ApiProperty({ description: 'ID da categoria', format: 'uuid' })
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'categoriaId deve ser um UUID válido',
  })
  categoriaId!: string;

  @ApiProperty({
    description: 'Periodicidade da manutenção',
    enum: Periodicidade,
    example: Periodicidade.MENSAL,
  })
  @IsEnum(Periodicidade)
  periodicidade!: Periodicidade;

  @ApiProperty({
    description: 'Data da próxima execução',
    example: '2025-12-01T00:00:00Z',
  })
  @IsDateString()
  proximaExecucao!: string;
}

