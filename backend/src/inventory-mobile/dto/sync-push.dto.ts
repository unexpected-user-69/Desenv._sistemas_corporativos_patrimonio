import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsUUID,
  IsEnum,
  IsDateString,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TipoLeitura } from '../entities/collected-item.entity';

export class CollectedItemPushDto {
  @ApiProperty({ description: 'ID do assignment', format: 'uuid' })
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'assignmentId deve ser um UUID válido',
  })
  assignmentId!: string;

  @ApiPropertyOptional({ description: 'Versão do item (para detecção de conflitos)', example: 1 })
  @IsOptional()
  version?: number;

  @ApiProperty({ description: 'Código lido (QRCode ou RFID)' })
  @IsString()
  @IsNotEmpty()
  codigoLido!: string;

  @ApiProperty({
    description: 'Tipo de leitura',
    enum: TipoLeitura,
    example: TipoLeitura.QRCODE,
  })
  @IsEnum(TipoLeitura)
  tipoLeitura!: TipoLeitura;

  @ApiProperty({ description: 'Data/hora da coleta', example: '2025-01-15T10:30:00Z' })
  @IsDateString()
  coletadoEm!: string;

  @ApiPropertyOptional({
    description: 'Coordenadas geográficas',
    example: { lat: -23.5505, lng: -46.6333, accuracy: 10 },
  })
  @IsOptional()
  geo?: { lat: number; lng: number; accuracy?: number };

  @ApiPropertyOptional({ description: 'ID do patrimônio encontrado', format: 'uuid' })
  @IsOptional()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'patrimonioId deve ser um UUID válido',
  })
  patrimonioId?: string;
}

export class SyncPushDto {
  @ApiProperty({ description: 'ID único do dispositivo mobile' })
  @IsString()
  @IsNotEmpty()
  deviceId!: string;

  @ApiProperty({
    description: 'Itens coletados para sincronizar',
    type: [CollectedItemPushDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CollectedItemPushDto)
  items!: CollectedItemPushDto[];

  @ApiPropertyOptional({
    description: 'ID do batch offline (para itens coletados offline)',
    format: 'uuid',
  })
  @IsOptional()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'batchId deve ser um UUID válido',
  })
  batchId?: string;
}

