import { ApiProperty } from '@nestjs/swagger';

export class PartResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  workOrderId!: string;

  @ApiProperty()
  descricao!: string;

  @ApiProperty()
  quantidade!: number;

  @ApiProperty()
  custoUnitario!: number;

  @ApiProperty()
  custoTotal!: number;
}


