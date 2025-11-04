import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
  @ApiProperty({
    description: 'Mensagem de confirmação',
    example: 'Logout realizado com sucesso',
  })
  message!: string;
}

