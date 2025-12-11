import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsObject, IsOptional, MaxLength } from 'class-validator';
import { NotificationChannel } from '../entities/notification-template.entity';

export class NotificationTestDto {
  @ApiProperty({
    description: 'Canal de notificação',
    enum: NotificationChannel,
    example: NotificationChannel.EMAIL,
  })
  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @ApiProperty({
    description: 'Chave do template ou evento',
    example: 'patrimonio.status.changed',
  })
  @IsString()
  @MaxLength(100)
  templateKey!: string;

  @ApiProperty({
    description: 'Dados para renderização do template',
    example: { patrimonio: { nome: 'Notebook Dell' }, novoStatus: 'ATIVO' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @ApiProperty({
    description: 'Destinatário (email, URL do webhook, etc.)',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  recipient?: string;
}




