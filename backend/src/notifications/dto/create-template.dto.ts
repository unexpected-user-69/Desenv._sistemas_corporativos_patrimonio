import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsInt, Min, MaxLength } from 'class-validator';
import { NotificationChannel } from '../entities/notification-template.entity';

export class CreateTemplateDto {
  @ApiProperty({
    description: 'Chave do template (ex: patrimonio.status.changed)',
    example: 'patrimonio.status.changed',
  })
  @IsString()
  @MaxLength(100)
  key!: string;

  @ApiProperty({
    description: 'Versão do template',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;

  @ApiProperty({
    description: 'Canal de notificação',
    enum: NotificationChannel,
    example: NotificationChannel.EMAIL,
  })
  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @ApiProperty({
    description: 'Assunto (para email)',
    example: 'Status do patrimônio alterado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  subject?: string;

  @ApiProperty({
    description: 'Corpo do template (Handlebars/Nunjucks)',
    example: 'O patrimônio {{patrimonio.nome}} teve seu status alterado para {{novoStatus}}',
  })
  @IsString()
  body!: string;

  @ApiProperty({
    description: 'Idioma do template',
    example: 'pt-BR',
    default: 'pt-BR',
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  locale?: string;
}




