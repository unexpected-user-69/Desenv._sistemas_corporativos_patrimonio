import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
  IsArray,
  MinLength,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsTrimmed, IsDateAfter } from '../../common/validators';
import { EventType } from '../enums/event-type.enum';
import { EventVisibility } from '../enums/event-visibility.enum';
import { EventState } from '../enums/event-state.enum';

export class CreateEventDto {
  @ApiProperty({
    description: 'Título do evento',
    example: 'Manutenção Preventiva - Janeiro 2025',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @IsTrimmed({ message: 'O título não pode conter espaços no início ou fim' })
  @MinLength(3)
  @MaxLength(200)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  title!: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do evento',
    example: 'Manutenção preventiva dos equipamentos de informática do setor administrativo',
    maxLength: 2000,
  })
  @IsOptional()
  @IsString()
  @IsTrimmed({ message: 'A descrição não pode conter espaços no início ou fim' })
  @MaxLength(2000)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  description?: string;

  @ApiProperty({
    description: 'Data e hora de início do evento',
    example: '2025-02-01T08:00:00Z',
    format: 'date-time',
  })
  @IsDateString({}, { message: 'A data de início deve ser uma data válida no formato ISO 8601' })
  startDate!: string;

  @ApiPropertyOptional({
    description: 'Data e hora de término do evento',
    example: '2025-02-01T17:00:00Z',
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de término deve ser uma data válida no formato ISO 8601' })
  @IsDateAfter('startDate', { message: 'A data de término deve ser posterior ou igual à data de início' })
  @ValidateIf((o) => o.endDate !== undefined && o.endDate !== null)
  endDate?: string;

  @ApiProperty({
    description: 'Tipo do evento',
    enum: EventType,
    example: EventType.MANUTENCAO,
  })
  @IsEnum(EventType, { message: 'O tipo de evento deve ser válido' })
  eventType!: EventType;

  @ApiPropertyOptional({
    description: 'IDs dos patrimônios relacionados ao evento. Use IDs de patrimônios que existem no sistema.',
    example: ['00000000-0000-4000-8000-000000000000'],
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'patrimonioIds deve ser um array' })
  @IsUUID(undefined, { each: true, message: 'Cada ID de patrimônio deve ser um UUID válido' })
  patrimonioIds?: string[];

  @ApiPropertyOptional({
    description: 'Visibilidade do evento',
    enum: EventVisibility,
    example: EventVisibility.PUBLIC,
    default: EventVisibility.PUBLIC,
  })
  @IsOptional()
  @IsEnum(EventVisibility, { message: 'A visibilidade deve ser válida' })
  visibility?: EventVisibility = EventVisibility.PUBLIC;

  @ApiPropertyOptional({
    description: 'Estado do evento',
    enum: EventState,
    example: EventState.DRAFT,
    default: EventState.DRAFT,
  })
  @IsOptional()
  @IsEnum(EventState, { message: 'O estado deve ser válido' })
  state?: EventState = EventState.DRAFT;
}
