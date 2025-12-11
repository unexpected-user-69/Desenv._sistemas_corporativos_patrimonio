import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    description: 'Refresh token para renovar o access token (obtido no login). IMPORTANTE: Use o refreshToken retornado no login (não o accessToken!). O refreshToken é um token aleatório base64url, não um JWT.',
    example: 'PB9P1tnlRUXS32JnNwVcESwamwFnPyN7rSwam6EUn60eDoQoPY7qTxu9qdDHYscM',
    minLength: 20,
    pattern: '^[A-Za-z0-9_-]+$',
  })
  @IsString()
  @MinLength(20, { message: 'Refresh token deve ter pelo menos 20 caracteres' })
  @Matches(/^[A-Za-z0-9_-]+$/, {
    message: 'Refresh token inválido. O refresh token é um token base64url (não um JWT). Use o refreshToken retornado no login, não o accessToken!',
  })
  refreshToken!: string;
}

