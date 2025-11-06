import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from '../entities/campaign.entity';

export class CampaignResponseDto {
  @ApiProperty({ description: 'ID da campanha', example: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Nome da campanha' })
  nome!: string;

  @ApiProperty({ description: 'Local da campanha' })
  local!: string;

  @ApiProperty({ description: 'Data de início do período' })
  periodoInicio!: Date;

  @ApiProperty({ description: 'Data de fim do período' })
  periodoFim!: Date;

  @ApiProperty({ description: 'ID do proprietário da campanha' })
  ownerId!: string;

  @ApiProperty({
    description: 'Status da campanha',
    enum: CampaignStatus,
    example: CampaignStatus.DRAFT,
  })
  status!: CampaignStatus;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}

