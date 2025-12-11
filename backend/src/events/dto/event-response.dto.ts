import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { EventType } from '../enums/event-type.enum';
import { EventVisibility } from '../enums/event-visibility.enum';
import { EventState } from '../enums/event-state.enum';
import { PatrimonioResponseDto } from '../../patrimonio/dto/patrimonio-response.dto';

export class EventResponseDto {
  @ApiProperty({
    description: 'ID único do evento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id!: string;

  @ApiProperty({
    description: 'Título do evento',
    example: 'Manutenção Preventiva - Janeiro 2025',
  })
  @Expose()
  title!: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do evento',
    example: 'Manutenção preventiva dos equipamentos de informática',
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Slug único do evento para URLs amigáveis',
    example: 'manutencao-preventiva-janeiro-2025',
  })
  @Expose()
  slug!: string;

  @ApiProperty({
    description: 'Data e hora de início do evento',
    example: '2025-02-01T08:00:00Z',
  })
  @Expose()
  startDate!: Date;

  @ApiPropertyOptional({
    description: 'Data e hora de término do evento',
    example: '2025-02-01T17:00:00Z',
  })
  @Expose()
  endDate?: Date;

  @ApiProperty({
    description: 'Tipo do evento',
    enum: EventType,
    example: EventType.MANUTENCAO,
  })
  @Expose()
  eventType!: EventType;

  @ApiProperty({
    description: 'Visibilidade do evento',
    enum: EventVisibility,
    example: EventVisibility.PUBLIC,
  })
  @Expose()
  visibility!: EventVisibility;

  @ApiProperty({
    description: 'Estado do evento',
    enum: EventState,
    example: EventState.DRAFT,
  })
  @Expose()
  state!: EventState;

  @ApiProperty({
    description: 'ID do usuário criador do evento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  createdBy!: string;

  @ApiPropertyOptional({
    description: 'Patrimônios relacionados ao evento',
    type: [PatrimonioResponseDto],
  })
  @Expose()
  @Type(() => PatrimonioResponseDto)
  patrimonios?: PatrimonioResponseDto[];

  @ApiProperty({
    description: 'Data de criação do evento',
    example: '2025-01-27T10:00:00Z',
  })
  @Expose()
  createdAt!: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2025-01-27T10:00:00Z',
  })
  @Expose()
  updatedAt!: Date;

  @ApiProperty({
    description: 'Versão do registro para controle de concorrência',
    example: 1,
  })
  @Expose()
  version!: number;
}
