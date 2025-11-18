import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

/**
 * DTO para atualização parcial de eventos.
 * Todos os campos do CreateEventDto são opcionais, exceto createdBy que não pode ser atualizado.
 */
export class UpdateEventDto extends PartialType(CreateEventDto) {}
