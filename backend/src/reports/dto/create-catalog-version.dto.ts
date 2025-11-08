import { IsString, IsOptional, IsObject, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCatalogVersionDto {
  @ApiProperty({
    description: 'Versão (ex: 1.0.0, 1.1.0, 2.0.0)',
    example: '1.1.0',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  version!: string;

  @ApiPropertyOptional({
    description: 'Changelog da versão',
    example: 'Adicionado filtro por categoria',
  })
  @IsOptional()
  @IsString()
  changelog?: string;

  @ApiPropertyOptional({
    description: 'Filtros desta versão',
    example: { status: 'ATIVO', categoriaId: 'xxx' },
  })
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Se é a versão atual',
    default: false,
  })
  @IsOptional()
  isCurrent?: boolean;
}


