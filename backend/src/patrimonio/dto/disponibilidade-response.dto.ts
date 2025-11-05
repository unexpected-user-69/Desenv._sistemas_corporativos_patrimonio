import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DisponibilidadeResponseDto {
  @ApiProperty({
    description: 'Indica se o patrimônio está disponível',
    example: true,
  })
  disponivel!: boolean;

  @ApiPropertyOptional({
    description: 'Motivo da indisponibilidade (se houver)',
    example: 'Patrimônio em manutenção',
  })
  motivo?: string;
}

