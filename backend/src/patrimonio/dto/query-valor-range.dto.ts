import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IsGreaterThanOrEqual } from '../../common/validators';

export class QueryValorRangeDto {
  @ApiProperty({
    description: 'Valor mínimo de aquisição',
    example: 1000,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorMinimo!: number;

  @ApiProperty({
    description: 'Valor máximo de aquisição',
    example: 5000,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsGreaterThanOrEqual('valorMinimo', {
    message: 'O valor máximo deve ser maior ou igual ao valor mínimo',
  })
  valorMaximo!: number;
}

