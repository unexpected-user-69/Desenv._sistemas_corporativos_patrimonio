import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MappingResult } from './data-mapper.service';

export class DryRunRecordDto {
  @ApiProperty({ description: 'ID externo do registro' })
  externalId!: string;

  @ApiProperty({ description: 'Dados mapeados' })
  data!: Record<string, any>;

  @ApiProperty({ description: 'Erros encontrados', type: [String] })
  errors!: string[];

  @ApiProperty({ description: 'Se o registro é válido' })
  valid!: boolean;

  @ApiPropertyOptional({ description: 'Ação que seria executada' })
  action?: 'create' | 'update' | 'skip';
}

export class DryRunReportDto {
  @ApiProperty({ description: 'Registros que seriam processados', type: [DryRunRecordDto] })
  records!: DryRunRecordDto[];

  @ApiProperty({ description: 'Estatísticas do processamento' })
  stats!: {
    total: number;
    successful: number;
    failed: number;
    wouldCreate: number;
    wouldUpdate: number;
    wouldSkip: number;
    errorsByField: Record<string, number>;
  };

  @ApiProperty({ description: 'Resumo das divergências encontradas' })
  divergences!: {
    field: string;
    sourceValue: any;
    targetValue: any;
    recordExternalId: string;
  }[];
}




