import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, MaxLength, Min } from 'class-validator';

export class CreatePartDto {
  @ApiProperty({
    description: 'Descrição da peça',
    example: 'Filtro de ar condicionado',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  descricao!: string;

  @ApiProperty({
    description: 'Quantidade de peças',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantidade!: number;

  @ApiProperty({
    description: 'Custo unitário da peça',
    example: 150.50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  custoUnitario!: number;
}


