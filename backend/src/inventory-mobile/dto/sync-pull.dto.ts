import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class SyncPullDto {
  @ApiProperty({
    description: 'ID único do dispositivo mobile',
    example: 'device-123-abc',
  })
  @IsString()
  @IsNotEmpty()
  deviceId!: string;

  @ApiPropertyOptional({
    description: 'Data da última sincronização (para buscar apenas mudanças)',
    example: '2025-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  lastSyncAt?: string;

  @ApiPropertyOptional({
    description: 'Versão mínima dos dados (para versionamento)',
    example: 1,
  })
  @IsOptional()
  minVersion?: number;
}

