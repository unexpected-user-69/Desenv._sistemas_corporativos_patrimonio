import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { PatrimonioStatus } from '../entities/patrimonio.entity';

export class QueryStatusMultiplosDto {
  @ApiProperty({
    description: 'Array de status para buscar',
    enum: PatrimonioStatus,
    isArray: true,
    example: [PatrimonioStatus.ATIVO, PatrimonioStatus.MANUTENCAO],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve informar pelo menos um status' })
  @IsEnum(PatrimonioStatus, { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return value.split(',').map((s: string) => s.trim());
    }
    return value;
  })
  status!: PatrimonioStatus[];
}

