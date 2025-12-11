import { ApiProperty } from '@nestjs/swagger';
import { WorkOrderStatus, Prioridade } from '../entities/work-order.entity';

export class WorkOrderResponseDto {
  @ApiProperty({ description: 'ID da OS', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'ID do patrimônio', format: 'uuid' })
  patrimonioId!: string;

  @ApiProperty({ description: 'Status da OS', enum: WorkOrderStatus })
  status!: WorkOrderStatus;

  @ApiProperty({ description: 'Título da OS' })
  titulo!: string;

  @ApiProperty({ description: 'Descrição da OS', required: false })
  descricao?: string;

  @ApiProperty({ description: 'Prioridade da OS', enum: Prioridade })
  prioridade!: Prioridade;

  @ApiProperty({ description: 'Data de abertura' })
  openedAt!: Date;

  @ApiProperty({ description: 'Data de fechamento', required: false })
  closedAt?: Date;

  @ApiProperty({ description: 'ID do responsável', format: 'uuid' })
  ownerId!: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}

