import { ApiProperty } from '@nestjs/swagger';

export class CampaignStatsDto {
  @ApiProperty({ description: 'Total de assignments', example: 10 })
  totalAssignments!: number;

  @ApiProperty({ description: 'Assignments pendentes', example: 2 })
  pendingAssignments!: number;

  @ApiProperty({ description: 'Assignments em progresso', example: 5 })
  inProgressAssignments!: number;

  @ApiProperty({ description: 'Assignments completados', example: 3 })
  completedAssignments!: number;

  @ApiProperty({ description: 'Total de itens coletados', example: 150 })
  totalCollectedItems!: number;

  @ApiProperty({ description: 'Total de divergências', example: 5 })
  totalDivergences!: number;

  @ApiProperty({ description: 'Taxa de conclusão (%)', example: 75.5 })
  completionRate!: number;
}

export class CampaignReportDto {
  @ApiProperty({ description: 'ID da campanha' })
  campaignId!: string;

  @ApiProperty({ description: 'Nome da campanha' })
  campaignName!: string;

  @ApiProperty({ description: 'Local da campanha' })
  location!: string;

  @ApiProperty({ description: 'Período de início' })
  periodStart!: Date;

  @ApiProperty({ description: 'Período de fim' })
  periodEnd!: Date;

  @ApiProperty({ description: 'Status da campanha' })
  status!: string;

  @ApiProperty({ description: 'Estatísticas da campanha', type: CampaignStatsDto })
  stats!: CampaignStatsDto;

  @ApiProperty({ description: 'Data de geração do relatório' })
  generatedAt!: Date;
}

