import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PatrimonioStatus, PatrimonioCategoria } from '../entities/patrimonio.entity';

export class PatrimonioResponseDto {
  @ApiProperty({
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id!: string;

  @ApiProperty({
    description: 'Código único do patrimônio',
    example: 'PAT-2024-001',
  })
  @Expose()
  codigo!: string;

  @ApiProperty({
    description: 'Nome do patrimônio',
    example: 'Notebook Dell Inspiron 15',
  })
  @Expose()
  nome!: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do patrimônio',
    example: 'Notebook para uso administrativo com Windows 11',
  })
  @Expose()
  descricao?: string;

  @ApiProperty({
    description: 'Categoria do patrimônio',
    enum: PatrimonioCategoria,
    example: PatrimonioCategoria.EQUIPAMENTO,
  })
  @Expose()
  categoria!: PatrimonioCategoria;

  @ApiProperty({
    description: 'Status do patrimônio',
    enum: PatrimonioStatus,
    example: PatrimonioStatus.ATIVO,
  })
  @Expose()
  status!: PatrimonioStatus;

  @ApiPropertyOptional({
    description: 'Marca do patrimônio',
    example: 'Dell',
  })
  @Expose()
  marca?: string;

  @ApiPropertyOptional({
    description: 'Modelo do patrimônio',
    example: 'Inspiron 15 3000',
  })
  @Expose()
  modelo?: string;

  @ApiPropertyOptional({
    description: 'Número de série do patrimônio',
    example: 'ABC123456789',
  })
  @Expose()
  numeroSerie?: string;

  @ApiPropertyOptional({
    description: 'Valor de aquisição do patrimônio',
    example: 2500.00,
  })
  @Expose()
  @Type(() => Number)
  valorAquisicao?: number;

  @ApiPropertyOptional({
    description: 'Data de aquisição do patrimônio',
    example: '2024-01-15',
  })
  @Expose()
  @Type(() => Date)
  dataAquisicao?: Date;

  @ApiPropertyOptional({
    description: 'Data de garantia do patrimônio',
    example: '2025-01-15',
  })
  @Expose()
  @Type(() => Date)
  dataGarantia?: Date;

  @ApiPropertyOptional({
    description: 'Localização física do patrimônio',
    example: 'Sala 101 - Setor Administrativo',
  })
  @Expose()
  localizacao?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário responsável pelo patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  responsavelId?: string;

  @ApiPropertyOptional({
    description: 'Observações adicionais sobre o patrimônio',
    example: 'Equipamento em perfeito estado de conservação',
  })
  @Expose()
  observacoes?: string;

  @ApiPropertyOptional({
    description: 'URL da foto do patrimônio',
    example: 'https://example.com/fotos/patrimonio-001.jpg',
  })
  @Expose()
  fotoUrl?: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  @Type(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    description: 'Versão do registro para controle de concorrência',
    example: 1,
  })
  @Expose()
  version!: number;
}
