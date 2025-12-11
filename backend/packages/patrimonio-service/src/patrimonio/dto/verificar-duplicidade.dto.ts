import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerificarDuplicidadeDto {
  @ApiPropertyOptional({
    description: 'Número de série para verificar',
    example: 'DL123456',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  numeroSerie?: string;

  @ApiPropertyOptional({
    description: 'Modelo para verificar',
    example: 'Inspiron 15',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  modelo?: string;

  @ApiPropertyOptional({
    description: 'Marca para verificar',
    example: 'Dell',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  marca?: string;
}

