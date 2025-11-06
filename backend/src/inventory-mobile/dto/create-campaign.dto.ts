import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'Nome da campanha de inventário',
    example: 'Inventário Q1 2025',
  })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({
    description: 'Local onde será realizado o inventário',
    example: 'Setor A - Sala 101',
  })
  @IsString()
  @IsNotEmpty()
  local!: string;

  @ApiProperty({
    description: 'Data e hora de início do período de inventário',
    example: '2025-01-20T00:00:00Z',
  })
  @IsDateString()
  periodoInicio!: string;

  @ApiProperty({
    description: 'Data e hora de fim do período de inventário',
    example: '2025-01-25T23:59:59Z',
  })
  @IsDateString()
  periodoFim!: string;
}

