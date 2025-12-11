import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePatrimonioDto } from './create-patrimonio.dto';

export class CreateBulkPatrimonioDto {
  @ApiProperty({
    description: 'Array de patrimônios para criar',
    type: [CreatePatrimonioDto],
    example: [
      {
        codigo: 'PAT-001',
        nome: 'Notebook 1',
        categoriaId: '123e4567-e89b-12d3-a456-426614174000',
      },
      {
        codigo: 'PAT-002',
        nome: 'Notebook 2',
        categoriaId: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve informar pelo menos um patrimônio' })
  @ValidateNested({ each: true })
  @Type(() => CreatePatrimonioDto)
  patrimonios!: CreatePatrimonioDto[];
}

