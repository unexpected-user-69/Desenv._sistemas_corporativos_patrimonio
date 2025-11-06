import { ApiProperty } from '@nestjs/swagger';

export class VersionInfoDto {
  @ApiProperty({ description: 'Versão do registro', example: 1 })
  version!: number;

  @ApiProperty({ description: 'Timestamp da última atualização' })
  updatedAt!: Date;

  @ApiProperty({ description: 'ID do usuário que atualizou' })
  updatedBy?: string;
}

export class ConflictResolutionDto {
  @ApiProperty({ description: 'ID do item com conflito' })
  itemId!: string;

  @ApiProperty({
    description: 'Estratégia de resolução',
    enum: ['server_wins', 'client_wins', 'merge', 'manual'],
  })
  strategy!: 'server_wins' | 'client_wins' | 'merge' | 'manual';

  @ApiProperty({ description: 'Dados do servidor', required: false })
  serverData?: Record<string, any>;

  @ApiProperty({ description: 'Dados do cliente', required: false })
  clientData?: Record<string, any>;
}

