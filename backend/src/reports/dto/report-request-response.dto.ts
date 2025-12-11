import { ApiProperty } from '@nestjs/swagger';
import { ReportType, ReportModel, ReportRequestStatus } from '../entities/report-request.entity';
import { ReportArtifactResponseDto } from './report-artifact-response.dto';

export class ReportRequestResponseDto {
  @ApiProperty({ description: 'ID da solicitação', example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ description: 'Tipo de relatório', enum: ReportType })
  type!: ReportType;

  @ApiProperty({ description: 'Modelo de relatório', enum: ReportModel })
  model!: ReportModel;

  @ApiProperty({
    description: 'Filtros aplicados',
    example: { status: 'ATIVO' },
    required: false,
  })
  filters?: Record<string, any>;

  @ApiProperty({ description: 'Status da solicitação', enum: ReportRequestStatus })
  status!: ReportRequestStatus;

  @ApiProperty({ description: 'ID do usuário que criou', example: '123e4567-e89b-12d3-a456-426614174000' })
  createdById!: string;

  @ApiProperty({ description: 'Mensagem de erro (se houver)', required: false })
  errorMessage?: string;

  @ApiProperty({ description: 'Artefato gerado (se disponível)', required: false })
  artifact?: ReportArtifactResponseDto;

  @ApiProperty({ description: 'Data de criação' })
  createdAt!: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt!: Date;
}




