import { ApiProperty } from '@nestjs/swagger';
import { CampaignResponseDto } from './campaign-response.dto';
import { AssignmentResponseDto } from './assignment-response.dto';

export class SyncPullResponseDto {
  @ApiProperty({
    description: 'Campanhas ativas para o dispositivo',
    type: [CampaignResponseDto],
  })
  campaigns!: CampaignResponseDto[];

  @ApiProperty({
    description: 'Assignments do coletor',
    type: [AssignmentResponseDto],
  })
  assignments!: AssignmentResponseDto[];

  @ApiProperty({
    description: 'Timestamp da sincronização',
    example: '2025-01-15T10:30:00Z',
  })
  syncTimestamp!: Date;

  @ApiProperty({
    description: 'Versão dos dados sincronizados',
    example: 2,
  })
  version!: number;
}

export class SyncPushResponseDto {
  @ApiProperty({ description: 'Número de itens processados', example: 10 })
  processed!: number;

  @ApiProperty({ description: 'Número de conflitos encontrados', example: 0 })
  conflictsCount!: number;

  @ApiProperty({
    description: 'Lista de erros (se houver)',
    type: [String],
    example: [],
  })
  errors!: string[];

  @ApiProperty({
    description: 'Lista de conflitos detectados (com informações de resolução)',
    type: [Object],
    example: [],
  })
  conflicts!: Array<{
    itemId: string;
    codigoLido: string;
    serverVersion: number;
    clientVersion: number;
    strategy?: string;
  }>;
}

