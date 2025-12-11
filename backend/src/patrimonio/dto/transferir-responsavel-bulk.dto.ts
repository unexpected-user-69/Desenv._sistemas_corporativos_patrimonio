import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsUUID,
  ArrayMinSize,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class TransferirResponsavelBulkDto {
  @ApiProperty({
    description: 'Array de IDs dos patrimônios para transferir',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve informar pelo menos um ID' })
  @IsUUID('all', { each: true })
  ids!: string[];

  @ApiProperty({
    description: 'ID do novo responsável',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID('all', { message: 'O ID do responsável deve ser um UUID válido' })
  novoResponsavelId!: string;

  @ApiPropertyOptional({
    description: 'Observações sobre a transferência',
    example: 'Transferência em lote para novo setor',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  observacoes?: string;
}

