import { IsUUID, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../users/enums/user-role.enum';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'ID do catálogo de relatório',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  catalogId!: string;

  @ApiPropertyOptional({
    description: 'ID do usuário específico (opcional - se null, aplica-se a todos do role)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Role (opcional - se null, aplica-se apenas ao usuário específico)',
    enum: UserRole,
    example: UserRole.TEACHER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Se pode visualizar',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  canView?: boolean;

  @ApiPropertyOptional({
    description: 'Se pode gerar',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  canGenerate?: boolean;

  @ApiPropertyOptional({
    description: 'Se pode baixar',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  canDownload?: boolean;
}


