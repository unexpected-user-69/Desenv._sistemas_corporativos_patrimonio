import { ApiProperty } from '@nestjs/swagger';
import { AssignmentStatus } from '../entities/assignment.entity';

export class AssignmentResponseDto {
  @ApiProperty({ description: 'ID do assignment' })
  id!: string;

  @ApiProperty({ description: 'ID da campanha' })
  campaignId!: string;

  @ApiProperty({ description: 'ID do coletor' })
  coletorId!: string;

  @ApiProperty({
    description: 'Status do assignment',
    enum: AssignmentStatus,
  })
  status!: AssignmentStatus;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}

