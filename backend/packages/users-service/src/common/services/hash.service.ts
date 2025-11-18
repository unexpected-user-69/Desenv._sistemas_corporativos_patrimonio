import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
  }

  async hash(plainPassword: string): Promise<string> {
    const pepper = process.env.HASH_PEPPER || '';
    const passwordWithPepper = plainPassword + (pepper ? pepper : '');
    return bcrypt.hash(passwordWithPepper, this.saltRounds);
  }

  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const pepper = process.env.HASH_PEPPER || '';
    const passwordWithPepper = plainPassword + (pepper ? pepper : '');
    return bcrypt.compare(passwordWithPepper, hashedPassword);
  }

  async generateSalt(): Promise<string> {
    return bcrypt.genSalt(this.saltRounds);
  }

  isValidHash(hash: string): boolean {
    return /^\$2[aby]\$\d+\$/.test(hash);
  }
}

