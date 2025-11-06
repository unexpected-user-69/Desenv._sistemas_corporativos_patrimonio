import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, Matches } from 'class-validator';
import { Prioridade } from '../entities/work-order.entity';

export class CreateWorkOrderDto {
  @ApiProperty({ description: 'ID do patrimônio', format: 'uuid' })
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'patrimonioId deve ser um UUID válido',
  })
  patrimonioId!: string;

  @ApiProperty({ description: 'Título da OS', example: 'Manutenção preventiva do ar condicionado' })
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @ApiPropertyOptional({ description: 'Descrição detalhada da OS' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({
    description: 'Prioridade da OS',
    enum: Prioridade,
    default: Prioridade.MEDIA,
  })
  @IsOptional()
  @IsEnum(Prioridade, { message: 'prioridade deve ser um dos valores: baixa, media, alta, urgente' })
  prioridade?: Prioridade;
}

