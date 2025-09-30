import { Expose } from 'class-transformer';
import { UserRole } from '../entities/user.entity';

export class UserResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: UserRole;

  @Expose()
  isActive!: boolean;

  @Expose()
  avatarUrl?: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  version!: number;

  // passwordHash é excluído por padrão (não tem @Expose)
}
