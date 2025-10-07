import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsUUID,
  MinLength,
  MaxLength,
  Min,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  PatrimonioStatus,
  PatrimonioCategoria,
} from '../entities/patrimonio.entity';

export class CreatePatrimonioDto {
  @ApiProperty({
    description: 'Código único do patrimônio',
    example: 'PAT-2024-001',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  codigo!: string;

  @ApiProperty({
    description: 'Nome do patrimônio',
    example: 'Notebook Dell Inspiron 15',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  nome!: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do patrimônio',
    example: 'Notebook para uso administrativo com Windows 11',
  })
  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  descricao?: string;

  @ApiProperty({
    description: 'Categoria do patrimônio',
    enum: PatrimonioCategoria,
    example: PatrimonioCategoria.EQUIPAMENTO,
  })
  @IsEnum(PatrimonioCategoria)
  categoria!: PatrimonioCategoria;

  @ApiPropertyOptional({
    description: 'Status do patrimônio',
    enum: PatrimonioStatus,
    example: PatrimonioStatus.ATIVO,
    default: PatrimonioStatus.ATIVO,
  })
  @IsOptional()
  @IsEnum(PatrimonioStatus)
  status?: PatrimonioStatus;

  @ApiPropertyOptional({
    description: 'Marca do patrimônio',
    example: 'Dell',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  marca?: string;

  @ApiPropertyOptional({
    description: 'Modelo do patrimônio',
    example: 'Inspiron 15 3000',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  modelo?: string;

  @ApiPropertyOptional({
    description: 'Número de série do patrimônio',
    example: 'ABC123456789',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  numeroSerie?: string;

  @ApiPropertyOptional({
    description: 'Valor de aquisição do patrimônio',
    example: 2500.0,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valorAquisicao?: number;

  @ApiPropertyOptional({
    description: 'Data de aquisição do patrimônio',
    example: '2024-01-15',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  dataAquisicao?: string;

  @ApiPropertyOptional({
    description: 'Data de garantia do patrimônio',
    example: '2025-01-15',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  dataGarantia?: string;

  @ApiPropertyOptional({
    description: 'Localização física do patrimônio',
    example: 'Sala 101 - Setor Administrativo',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  localizacao?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário responsável pelo patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  responsavelId?: string;

  @ApiPropertyOptional({
    description: 'Observações adicionais sobre o patrimônio',
    example: 'Equipamento em perfeito estado de conservação',
  })
  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  observacoes?: string;

  @ApiPropertyOptional({
    description: 'URL da foto do patrimônio',
    example: 'https://example.com/fotos/patrimonio-001.jpg',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  fotoUrl?: string;
}
