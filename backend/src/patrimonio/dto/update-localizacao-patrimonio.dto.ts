import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrimmed } from '../../common/validators';

export class UpdateLocalizacaoPatrimonioDto {
  @ApiProperty({
    description: 'Nova localização do patrimônio',
    example: 'Sala 205 - Setor Financeiro',
    maxLength: 255,
  })
  @IsString()
  @IsTrimmed({ message: 'A localização não pode conter espaços no início ou fim' })
  @MaxLength(255, { message: 'A localização não pode ter mais de 255 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  localizacao!: string;

  @ApiPropertyOptional({
    description: 'Observações sobre a mudança de localização',
    example: 'Mudança de setor',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @IsTrimmed({ message: 'As observações não podem conter espaços no início ou fim' })
  @MaxLength(1000, { message: 'As observações não podem ter mais de 1000 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  observacoes?: string;
}
