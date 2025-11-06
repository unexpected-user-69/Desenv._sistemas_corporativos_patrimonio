import { ApiProperty } from '@nestjs/swagger';
import { Periodicidade } from '../entities/maintenance-plan.entity';

export class MaintenancePlanResponseDto {
  @ApiProperty({ description: 'ID do plano', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'ID da categoria', format: 'uuid' })
  categoriaId!: string;

  @ApiProperty({ description: 'Periodicidade', enum: Periodicidade })
  periodicidade!: Periodicidade;

  @ApiProperty({ description: 'Próxima execução' })
  proximaExecucao!: Date;

  @ApiProperty({ description: 'ID do responsável', format: 'uuid' })
  ownerId!: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}

