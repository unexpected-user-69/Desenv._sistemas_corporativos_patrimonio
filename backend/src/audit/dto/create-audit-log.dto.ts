import { IsString, IsOptional, IsObject, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateAuditLogDto {
  @ApiProperty({ 
    description: 'ID do usuário que realizou a ação',
    required: false,
    nullable: true,
    example: null
  })
  @Transform(({ value }) => {
    if (!value || value === 'string' || value === '' || value === null) {
      return undefined;
    }
    return value;
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Ação realizada', example: 'CREATE' })
  @IsString()
  action: string;

  @ApiProperty({ description: 'Tipo da entidade', example: 'Patrimonio' })
  @IsString()
  entityType: string;

  @ApiProperty({ 
    description: 'ID da entidade',
    required: false,
    nullable: true,
    example: null
  })
  @Transform(({ value }) => {
    if (!value || value === 'string' || value === '' || value === null) {
      return undefined;
    }
    return value;
  })
  @IsOptional()
  entityId?: string;

  @ApiProperty({ description: 'Valores anteriores', required: false })
  @IsOptional()
  @ValidateIf((o) => o.oldValues !== null && o.oldValues !== undefined)
  @IsObject()
  oldValues?: Record<string, any> | null;

  @ApiProperty({ description: 'Novos valores', required: false })
  @IsOptional()
  @ValidateIf((o) => o.newValues !== null && o.newValues !== undefined)
  @IsObject()
  newValues?: Record<string, any> | null;

  @ApiProperty({ 
    description: 'Endereço IP', 
    required: false,
    nullable: true,
    type: String,
    example: null
  })
  @IsOptional()
  @ValidateIf((o) => o.ipAddress !== null && o.ipAddress !== undefined)
  @IsString()
  @Transform(({ value }) => {
    if (value === 'string' || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return null;
    }
    return value;
  })
  ipAddress?: string | null;

  @ApiProperty({ 
    description: 'User Agent', 
    required: false,
    nullable: true,
    type: String,
    example: null
  })
  @IsOptional()
  @ValidateIf((o) => o.userAgent !== null && o.userAgent !== undefined)
  @IsString()
  @Transform(({ value }) => {
    if (value === 'string' || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return null;
    }
    return value;
  })
  userAgent?: string | null;

  @ApiProperty({ 
    description: 'ID da sessão',
    required: false,
    nullable: true,
    example: null
  })
  @Transform(({ value }) => {
    if (!value || value === 'string' || value === '' || value === null) {
      return undefined;
    }
    return value;
  })
  @IsOptional()
  sessionId?: string;

  @ApiProperty({ 
    description: 'Serviço que gerou o log', 
    required: false,
    nullable: true,
    type: String,
    example: null
  })
  @IsOptional()
  @ValidateIf((o) => o.service !== null && o.service !== undefined)
  @IsString()
  @Transform(({ value }) => {
    if (value === 'string' || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return null;
    }
    return value;
  })
  service?: string | null;

  @ApiProperty({ 
    description: 'Endpoint acessado', 
    required: false,
    nullable: true,
    type: String,
    example: null
  })
  @IsOptional()
  @ValidateIf((o) => o.endpoint !== null && o.endpoint !== undefined)
  @IsString()
  @Transform(({ value }) => {
    if (value === 'string' || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return null;
    }
    return value;
  })
  endpoint?: string | null;

  @ApiProperty({ 
    description: 'Descrição da ação', 
    required: false,
    nullable: true,
    type: String,
    example: null
  })
  @IsOptional()
  @ValidateIf((o) => o.description !== null && o.description !== undefined)
  @IsString()
  @Transform(({ value }) => {
    if (value === 'string' || value === '' || (typeof value === 'object' && Object.keys(value).length === 0)) {
      return null;
    }
    return value;
  })
  description?: string | null;
}
