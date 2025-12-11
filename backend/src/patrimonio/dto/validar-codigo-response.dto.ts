import { ApiProperty } from '@nestjs/swagger';

export class ValidarCodigoResponseDto {
  @ApiProperty({
    description: 'Indica se o código está disponível',
    example: true,
  })
  disponivel!: boolean;
}

