import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrimmed } from '../../common/validators';

export class TransferirResponsavelDto {
  @ApiProperty({
    description: 'ID do novo responsável pelo patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'O ID do responsável deve ser um UUID válido' })
  novoResponsavelId!: string;

  @ApiPropertyOptional({
    description: 'Observações sobre a transferência',
    example: 'Transferência de setor',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @IsTrimmed({ message: 'As observações não podem conter espaços no início ou fim' })
  @MaxLength(1000, { message: 'As observações não podem ter mais de 1000 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  observacoes?: string;
}




