import { ApiProperty } from '@nestjs/swagger';

export class QuotaResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  used!: number;

  @ApiProperty()
  periodStart!: Date;

  @ApiProperty()
  periodEnd!: Date;

  @ApiProperty()
  periodType!: 'daily' | 'weekly' | 'monthly';

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

