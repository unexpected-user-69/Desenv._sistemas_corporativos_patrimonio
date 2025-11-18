import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
  @ApiProperty({
    description: 'Novo access token JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC05MGFiLWNkZWYtMTIzNC01Njc4OTBhYmNkZWYiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJTVFVERU5UIl0sImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MjM5OTIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Novo refresh token (use este token para próximas renovações)',
    example: 'qaiCplsQHiw1DeSld-uhZX5z93TQzIm8V2Itkhny9pZC7LALYZPj_bqgda3ONI53',
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

