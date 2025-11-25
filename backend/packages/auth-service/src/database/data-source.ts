import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TlsOptions } from 'tls';
import { config } from 'dotenv';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
config();

const common = {
  type: 'postgres' as const,
  entities: [RefreshToken],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false, // nunca em prod
  migrationsRun: false, // rode pelos scripts
  logging: process.env.DB_LOGGING === 'true',
  applicationName: 'auth-service',
};

// SSL quando necessário (ex.: Supabase/Render/Heroku)
const sslOptions: TlsOptions | boolean | undefined =
  process.env.DB_SSL === 'true' ||
  (process.env.DATABASE_URL ?? '').includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined;

const options: PostgresConnectionOptions = process.env.DATABASE_URL
  ? {
      ...common,
      url: process.env.DATABASE_URL,
      ssl: sslOptions,
    }
  : {
      ...common,
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'patrimonio_inventario',
      ssl: sslOptions,
    };

export const AppDataSource = new DataSource(options);






