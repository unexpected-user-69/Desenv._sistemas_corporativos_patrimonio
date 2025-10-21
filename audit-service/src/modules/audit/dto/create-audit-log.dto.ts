import { IsString, IsOptional, IsUUID, IsObject, IsInet } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditLogDto {
  @ApiProperty({ description: 'ID do usuário que realizou a ação' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Ação realizada', example: 'CREATE' })
  @IsString()
  action: string;

  @ApiProperty({ description: 'Tipo da entidade', example: 'Patrimonio' })
  @IsString()
  entityType: string;

  @ApiProperty({ description: 'ID da entidade' })
  @IsOptional()
  @IsUUID()
  entityId?: string;

  @ApiProperty({ description: 'Valores anteriores' })
  @IsOptional()
  @IsObject()
  oldValues?: Record<string, any>;

  @ApiProperty({ description: 'Novos valores' })
  @IsOptional()
  @IsObject()
  newValues?: Record<string, any>;

  @ApiProperty({ description: 'Endereço IP' })
  @IsOptional()
  @IsInet()
  ipAddress?: string;

  @ApiProperty({ description: 'User Agent' })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({ description: 'ID da sessão' })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiProperty({ description: 'Serviço que gerou o log' })
  @IsOptional()
  @IsString()
  service?: string;

  @ApiProperty({ description: 'Endpoint acessado' })
  @IsOptional()
  @IsString()
  endpoint?: string;

  @ApiProperty({ description: 'Descrição da ação' })
  @IsOptional()
  @IsString()
  description?: string;
}
