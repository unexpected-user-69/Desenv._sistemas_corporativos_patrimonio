import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryCategoriasMultiplasDto {
  @ApiProperty({
    description: 'Array de IDs de categorias para buscar',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve informar pelo menos uma categoria' })
  @IsUUID('all', { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return value.split(',').map((s: string) => s.trim());
    }
    return value;
  })
  categoriaIds!: string[];
}

