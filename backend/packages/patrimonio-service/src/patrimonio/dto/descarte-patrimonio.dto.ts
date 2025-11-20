import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrimmed } from '../../common/validators';

export class DescartePatrimonioDto {
  @ApiProperty({
    description: 'Data prevista para o descarte',
    example: '2025-12-31',
    format: 'date',
  })
  @IsDateString({}, { message: 'A data de descarte deve ser uma data válida no formato ISO' })
  dataDescarte!: string;

  @ApiProperty({
    description: 'Motivo do descarte',
    example: 'Equipamento obsoleto',
    maxLength: 500,
  })
  @IsString()
  @IsTrimmed({ message: 'O motivo do descarte não pode conter espaços no início ou fim' })
  @MaxLength(500, { message: 'O motivo do descarte não pode ter mais de 500 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  motivoDescarte!: string;

  @ApiPropertyOptional({
    description: 'Destino do descarte',
    example: 'Leilão público',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @IsTrimmed({ message: 'O destino do descarte não pode conter espaços no início ou fim' })
  @MaxLength(255, { message: 'O destino do descarte não pode ter mais de 255 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  destinoDescarte?: string;
}

