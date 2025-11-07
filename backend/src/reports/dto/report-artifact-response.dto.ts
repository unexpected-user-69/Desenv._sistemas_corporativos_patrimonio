import { ApiProperty } from '@nestjs/swagger';

export class ReportArtifactResponseDto {
  @ApiProperty({ description: 'ID do artefato', example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ description: 'ID da solicitação', example: '123e4567-e89b-12d3-a456-426614174000' })
  requestId!: string;

  @ApiProperty({ description: 'Chave de armazenamento (S3/MinIO)', example: 'reports/2025/01/report-123.csv' })
  storageKey!: string;

  @ApiProperty({ description: 'Tipo MIME', example: 'text/csv' })
  mime!: string;

  @ApiProperty({ description: 'Tamanho em bytes', example: 1024000 })
  sizeBytes!: number;

  @ApiProperty({ description: 'Data de expiração', required: false })
  expiresAt?: Date;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;
}

