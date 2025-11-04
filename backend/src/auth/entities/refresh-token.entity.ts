import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entidade para Refresh Tokens de autenticação.
 * 
 * Baseada no padrão do Aurora Platform, adaptada para UUID.
 * Armazena tokens de refresh com hash Argon2 para segurança.
 */
@Entity({ name: 'auth_refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id!: number; // PK inteiro autogerado pelo BD

  @Index()
  @Column({ type: 'uuid' }) // Adaptado para UUID conforme padrão do Patrimônio
  userId!: string;

  @Column({ type: 'varchar', length: 255 })
  tokenHash!: string; // nunca armazenar o token em claro (Argon2 hash)

  @Column({ type: 'timestamptz' })
  issuedAt!: Date;

  @Index()
  @Column({ type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  revokedAt!: Date | null;

  @Column({ type: 'int', nullable: true })
  replacedByTokenId!: number | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userAgent!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

