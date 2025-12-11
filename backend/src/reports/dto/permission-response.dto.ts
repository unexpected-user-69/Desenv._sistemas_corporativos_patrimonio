import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../shared/enums/user-role.enum';

export class PermissionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  catalogId!: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional({ enum: UserRole })
  role?: UserRole;

  @ApiProperty()
  canView!: boolean;

  @ApiProperty()
  canGenerate!: boolean;

  @ApiProperty()
  canDownload!: boolean;

  @ApiProperty()
  createdById!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}


