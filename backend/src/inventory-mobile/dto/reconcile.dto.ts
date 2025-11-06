import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReconcileDto {
  @ApiProperty({
    description: 'ID da campanha para conciliar',
    format: 'uuid',
    example: 'uuid-campaign-id',
  })
  @IsUUID()
  campaignId!: string;
}

export class ReconciliationResponseDto {
  @ApiProperty({ description: 'ID da reconciliação' })
  id!: string;

  @ApiProperty({ description: 'ID da campanha' })
  campaignId!: string;

  @ApiProperty({
    description: 'Status da reconciliação',
    enum: ['pending', 'processing', 'completed', 'failed'],
  })
  status!: string;

  @ApiProperty({ description: 'Total de divergências encontradas', example: 5 })
  totalDivergencias!: number;

  @ApiProperty({ description: 'Data de execução' })
  executedAt?: Date;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;
}

