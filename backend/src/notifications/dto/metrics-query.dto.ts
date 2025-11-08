import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsEnum, IsString, MaxLength } from 'class-validator';
import { NotificationChannel } from '../entities/notification-template.entity';

export class MetricsQueryDto {
  @ApiPropertyOptional({
    description: 'Data inicial do período',
    example: '2025-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Data final do período',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por chave de evento',
    example: 'events.patrimonio.status.changed',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  eventKey?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por canal',
    enum: NotificationChannel,
  })
  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;
}



