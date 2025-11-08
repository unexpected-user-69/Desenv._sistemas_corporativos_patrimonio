import { ApiProperty } from '@nestjs/swagger';

export class WebhookResponseDto {
  @ApiProperty({ description: 'ID do webhook' })
  id!: string;

  @ApiProperty({ description: 'Nome do webhook' })
  name!: string;

  @ApiProperty({ description: 'URL do webhook' })
  url!: string;

  @ApiProperty({ description: 'Webhook habilitado' })
  enabled!: boolean;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}




