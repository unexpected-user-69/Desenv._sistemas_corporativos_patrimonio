import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TlsOptions } from 'tls';
import { config } from 'dotenv';
import * as fs from 'fs';
config();

console.log('--- ENV DEBUG ---');
console.log('CWD:', process.cwd());
try {
  console.log('ENV Content:', fs.readFileSync('.env', 'utf-8'));
} catch (e) {
  console.log('Could not read .env:', e.message);
}
console.log('Process Env DB_TYPE:', process.env.DB_TYPE);
console.log('--- ENV DEBUG END ---');

const common = {
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  migrationsRun: false,
  logging: process.env.DB_LOGGING === 'true',
  applicationName: 'patrimonio-inventario',
};

const isSqlite = process.env.DB_TYPE === 'sqlite';

let options: any;

if (isSqlite) {
  options = {
    ...common,
    type: 'sqlite',
    database: process.env.DB_DATABASE || 'database.sqlite',
    synchronize: true, // Para PoC/SQLite é útil
  };
} else {
  // SSL quando necessário (ex.: Supabase/Render/Heroku)
  const sslOptions: TlsOptions | boolean | undefined =
    process.env.DB_SSL === 'true' ||
      (process.env.DATABASE_URL ?? '').includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : undefined;

  options = process.env.DATABASE_URL
    ? {
      ...common,
      type: 'postgres',
      url: process.env.DATABASE_URL, // usando URL completa
      ssl: sslOptions,
    }
    : {
      ...common,
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
      ssl: sslOptions,
    };
}

console.log('--- DB CONFIG START ---');
console.log('DB_TYPE env:', process.env.DB_TYPE);
console.log('Using database type:', isSqlite ? 'sqlite' : 'postgres');
console.log('--- DB CONFIG END ---');

export const AppDataSource = new DataSource(options);
