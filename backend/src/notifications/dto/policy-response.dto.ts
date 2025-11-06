import { ApiProperty } from '@nestjs/swagger';
import { NotificationPriority } from '../entities/notification-policy.entity';

export class PolicyResponseDto {
  @ApiProperty({ description: 'ID da política' })
  id!: string;

  @ApiProperty({ description: 'Chave do evento' })
  eventKey!: string;

  @ApiProperty({ description: 'Prioridade', enum: NotificationPriority })
  priority!: NotificationPriority;

  @ApiProperty({ description: 'Canais de notificação', type: [String] })
  channels!: string[];

  @ApiProperty({ description: 'Política habilitada' })
  enabled!: boolean;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}

