import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id!: string;

  @ApiProperty({ example: 'João Silva' })
  @Expose()
  name!: string;

  @ApiProperty({ example: 'joao.silva@example.com' })
  @Expose()
  email!: string;

  @ApiProperty({ example: 'ADMIN' })
  @Expose()
  role!: string;

  @ApiProperty({ example: true })
  @Expose()
  isActive!: boolean;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @Expose()
  avatarUrl?: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @Expose()
  updatedAt!: Date;

  @ApiProperty({ example: 1 })
  @Expose()
  version!: number;
}


