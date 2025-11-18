import { Expose, Exclude } from 'class-transformer';
import { UserRole } from '../enums/user-role.enum';

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

  @Exclude()
  passwordHash!: string;
}
