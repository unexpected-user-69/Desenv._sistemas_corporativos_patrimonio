import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsArray, IsBoolean, MaxLength } from 'class-validator';
import { NotificationPriority } from '../entities/notification-policy.entity';

export class CreatePolicyDto {
  @ApiProperty({
    description: 'Chave do evento (ex: events.patrimonio.status.changed)',
    example: 'events.patrimonio.status.changed',
  })
  @IsString()
  @MaxLength(100)
  eventKey!: string;

  @ApiProperty({
    description: 'Prioridade da notificação',
    enum: NotificationPriority,
    example: NotificationPriority.MEDIUM,
    default: NotificationPriority.MEDIUM,
  })
  @IsOptional()
  @IsEnum(NotificationPriority)
  priority?: NotificationPriority;

  @ApiProperty({
    description: 'Canais de notificação',
    example: ['email', 'webhook'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  channels!: string[];

  @ApiProperty({
    description: 'Política habilitada',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}




