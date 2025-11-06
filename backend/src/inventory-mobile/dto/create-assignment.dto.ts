import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, IsString, Matches } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({
    description: 'IDs dos coletores que receberão lotes',
    type: [String],
    example: ['00000000-0000-0000-0000-000000000001'],
  })
  @IsArray({ message: 'coletorIds deve ser um array' })
  @ArrayMinSize(1, { message: 'Deve informar pelo menos um coletor' })
  @IsString({ each: true })
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    each: true,
    message: 'Cada ID de coletor deve ser um UUID válido',
  })
  coletorIds!: string[];
}

