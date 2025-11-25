import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrimmed } from '../../common/validators';
import { PatrimonioStatus } from '../entities/patrimonio.entity';

export class UpdateStatusPatrimonioDto {
  @ApiProperty({
    description: 'Novo status do patrimônio',
    enum: PatrimonioStatus,
    example: PatrimonioStatus.MANUTENCAO,
  })
  @IsEnum(PatrimonioStatus, {
    message: 'Status deve ser um dos valores válidos: ATIVO, MANUTENCAO, DESCARTADO',
  })
  status!: PatrimonioStatus;

  @ApiPropertyOptional({
    description: 'Observações sobre a alteração de status',
    example: 'Enviado para manutenção preventiva',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @IsTrimmed({ message: 'As observações não podem conter espaços no início ou fim' })
  @MaxLength(1000, { message: 'As observações não podem ter mais de 1000 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  observacoes?: string;
}




