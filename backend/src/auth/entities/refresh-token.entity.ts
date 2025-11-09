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
  @Column({ name: 'user_id', type: 'uuid' }) // Adaptado para UUID conforme padrão do Patrimônio
  userId!: string;

  @Index()
  @Column({ name: 'lookup_key', type: 'varchar', length: 64, nullable: true })
  lookupKey!: string | null; // Hash rápido (SHA256) para lookup eficiente, depois verifica com Argon2

  @Column({ name: 'token_hash', type: 'varchar', length: 255 })
  tokenHash!: string; // nunca armazenar o token em claro (Argon2 hash)

  @Column({ name: 'issued_at', type: 'timestamptz' })
  issuedAt!: Date;

  @Index()
  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt!: Date | null;

  @Column({ name: 'replaced_by_token_id', type: 'int', nullable: true })
  replacedByTokenId!: number | null;

  @Column({ name: 'ip', type: 'varchar', length: 45, nullable: true })
  ip!: string | null;

  @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
  userAgent!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}

