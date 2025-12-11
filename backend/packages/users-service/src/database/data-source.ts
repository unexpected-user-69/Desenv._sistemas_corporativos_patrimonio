import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TlsOptions } from 'tls';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
config();

const dbSchema = process.env.DB_SCHEMA ?? 'users';

const common = {
  type: 'postgres' as const,
  entities: [User],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  migrationsRun: false,
  logging: process.env.DB_LOGGING === 'true',
  applicationName: 'users-service',
  schema: dbSchema, // Schema isolado para users-service
  // Configuração do search_path conforme especificação (meusarq_md - 1211)
  extra: {
    options: `-c search_path=${dbSchema},public`,
  },
};

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
      database: process.env.DB_NAME ?? 'patrimonio',
      ssl: sslOptions,
    };

export const AppDataSource = new DataSource(options);






