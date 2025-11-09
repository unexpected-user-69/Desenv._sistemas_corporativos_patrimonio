import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Access token JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC05MGFiLWNkZWYtMTIzNC01Njc4OTBhYmNkZWYiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJTVFVERU5UIl0sImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MjM5OTIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh token para renovar o access token. IMPORTANTE: Este é um token aleatório base64url (não um JWT). Use este token no endpoint /v1/auth/refresh para obter novos tokens. Não confunda com o accessToken!',
    example: 'PB9P1tnlRUXS32JnNwVcESwamwFnPyN7rSwam6EUn60eDoQoPY7qTxu9qdDHYscM',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Informações do usuário autenticado',
    example: {
      id: '12345678-90ab-cdef-1234-567890abcdef',
      email: 'user@example.com',
      name: 'User Name',
      role: 'ADMIN',
    },
  })
  user!: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

