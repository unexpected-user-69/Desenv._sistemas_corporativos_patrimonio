import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportType, ReportModel } from '../entities/report-request.entity';

export class CatalogVersionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  catalogId!: string;

  @ApiProperty()
  version!: string;

  @ApiPropertyOptional()
  changelog?: string;

  @ApiPropertyOptional()
  filters?: Record<string, any>;

  @ApiProperty()
  isCurrent!: boolean;

  @ApiProperty()
  createdById!: string;

  @ApiProperty()
  createdAt!: Date;
}

export class CatalogResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  key!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ enum: ReportType })
  type!: ReportType;

  @ApiProperty({ enum: ReportModel })
  model!: ReportModel;

  @ApiPropertyOptional()
  defaultFilters?: Record<string, any>;

  @ApiProperty()
  currentVersion!: string;

  @ApiProperty()
  active!: boolean;

  @ApiProperty()
  requiresPermission!: boolean;

  @ApiProperty()
  createdById!: string;

  @ApiPropertyOptional()
  updatedById?: string;

  @ApiPropertyOptional({ type: [CatalogVersionResponseDto] })
  versions?: CatalogVersionResponseDto[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

