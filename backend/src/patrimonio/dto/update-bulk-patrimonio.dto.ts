import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePatrimonioDto } from './update-patrimonio.dto';

export class UpdateBulkPatrimonioDto {
  @ApiProperty({
    description: 'Array de IDs dos patrimônios para atualizar',
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
    description: 'Dados para atualizar nos patrimônios',
    type: UpdatePatrimonioDto,
  })
  @ValidateNested()
  @Type(() => UpdatePatrimonioDto)
  dados!: UpdatePatrimonioDto;
}

