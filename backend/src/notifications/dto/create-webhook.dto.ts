import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl, MaxLength } from 'class-validator';

export class CreateWebhookDto {
  @ApiProperty({
    description: 'Nome do webhook',
    example: 'Webhook de Patrimônio',
  })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    description: 'URL do webhook',
    example: 'https://example.com/webhook',
  })
  @IsUrl()
  @MaxLength(500)
  url!: string;

  @ApiProperty({
    description: 'Segredo para assinatura HMAC',
    example: 'my-secret-key',
  })
  @IsString()
  @MaxLength(255)
  secret!: string;

  @ApiProperty({
    description: 'Webhook habilitado',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}




