import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { User } from '../../src/users/entities/user.entity';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { randomUUID } from 'crypto';

let userSeq = 1;

export function makeCreateUserDto(
  overrides?: Partial<CreateUserDto>,
): CreateUserDto {
  const base: CreateUserDto = {
    name: `User ${userSeq}`,
    email: `user${userSeq}@example.com`,
    password: 'StrongP@ssw0rd!',
    role: UserRole.STUDENT,
  } as CreateUserDto;
  userSeq++;
  return { ...base, ...(overrides ?? {}) } as CreateUserDto;
}

export function makeUserEntity(overrides?: Partial<User>): Partial<User> {
  const dto = makeCreateUserDto();
  const base: Partial<User> = {
    id: randomUUID(), // UUID em vez de Integer
    name: dto.name,
    email: dto.email,
    passwordHash: 'hashed-password',
    role: dto.role ?? UserRole.STUDENT,
    isActive: true,
    avatarUrl: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  };
  return { ...base, ...(overrides ?? {}) };
}

