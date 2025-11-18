import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

/**
 * Service dedicado para operações de hash de senhas
 * Implementa injeção de dependência para facilitar testes e manutenção
 */
@Injectable()
export class HashService {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
  }

  /**
   * Gera hash seguro da senha usando bcrypt com salt
   * @param plainPassword - Senha em texto plano
   * @returns Promise<string> - Hash da senha
   */
  async hash(plainPassword: string): Promise<string> {
    const pepper = process.env.HASH_PEPPER || '';
    const passwordWithPepper = plainPassword + (pepper ? pepper : '');

    return bcrypt.hash(passwordWithPepper, this.saltRounds);
  }

  /**
   * Compara senha em texto plano com hash
   * @param plainPassword - Senha em texto plano
   * @param hashedPassword - Hash da senha
   * @returns Promise<boolean> - True se as senhas coincidem
   */
  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const pepper = process.env.HASH_PEPPER || '';
    const passwordWithPepper = plainPassword + (pepper ? pepper : '');

    return bcrypt.compare(passwordWithPepper, hashedPassword);
  }

  /**
   * Gera salt personalizado
   * @returns Promise<string> - Salt gerado
   */
  async generateSalt(): Promise<string> {
    return bcrypt.genSalt(this.saltRounds);
  }

  /**
   * Verifica se uma string é um hash válido
   * @param hash - String para verificar
   * @returns boolean - True se é um hash válido
   */
  isValidHash(hash: string): boolean {
    return /^\$2[aby]\$\d+\$/.test(hash);
  }
}

