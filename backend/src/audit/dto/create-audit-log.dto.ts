import { IsString, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateAuditLogDto {
  @ApiProperty({ 
    description: 'ID do usuário que realizou a ação (deve ser um UUID válido)',
    required: false,
    nullable: true,
    example: '143b7f80-daca-4d0f-aa52-752f678e748e'
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
    description: 'ID da entidade (deve ser um UUID válido)',
    required: false,
    nullable: true,
    example: 'b4e78c33-a198-452d-932d-a05d0794fad0'
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
  @Transform(({ value }) => {
    // Converter null ou objeto vazio para undefined
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
      return undefined;
    }
    return value;
  })
  oldValues?: Record<string, any> | null;

  @ApiProperty({ description: 'Novos valores', required: false })
  @IsOptional()
  @Transform(({ value }) => {
    // Converter null ou objeto vazio para undefined
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
      return undefined;
    }
    return value;
  })
  newValues?: Record<string, any> | null;

  @ApiProperty({ 
    description: 'Endereço IP', 
    required: false,
    nullable: true,
    type: String,
    example: '192.168.1.1'
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
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
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
    description: 'ID da sessão (deve ser um UUID válido)',
    required: false,
    nullable: true,
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
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
    example: 'patrimonio-backend'
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
    example: '/v1/patrimonio'
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
    example: 'Criação de novo patrimônio'
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
