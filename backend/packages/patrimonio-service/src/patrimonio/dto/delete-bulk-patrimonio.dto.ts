import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class DeleteBulkPatrimonioDto {
  @ApiProperty({
    description: 'Array de IDs dos patrimônios para deletar (máximo 100)',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsArray({ message: 'IDs deve ser um array' })
  @ArrayMinSize(1, { message: 'Deve informar pelo menos um ID' })
  @ArrayMaxSize(100, { message: 'Máximo de 100 patrimônios podem ser deletados por vez' })
  @IsUUID('all', { each: true, message: 'Todos os IDs devem ser UUIDs válidos' })
  ids!: string[];
}


