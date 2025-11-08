import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class NovosQueryDto {
  @ApiPropertyOptional({
    description: 'Número de dias para considerar patrimônios como novos',
    example: 30,
    minimum: 1,
    default: 30,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  dias?: number = 30;
}

