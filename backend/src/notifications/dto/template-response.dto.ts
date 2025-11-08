import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannel } from '../entities/notification-template.entity';

export class TemplateResponseDto {
  @ApiProperty({ description: 'ID do template' })
  id!: string;

  @ApiProperty({ description: 'Chave do template' })
  key!: string;

  @ApiProperty({ description: 'Versão do template' })
  version!: number;

  @ApiProperty({ description: 'Canal de notificação', enum: NotificationChannel })
  channel!: NotificationChannel;

  @ApiProperty({ description: 'Assunto (para email)', required: false })
  subject?: string;

  @ApiProperty({ description: 'Corpo do template' })
  body!: string;

  @ApiProperty({ description: 'Idioma do template' })
  locale!: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}



