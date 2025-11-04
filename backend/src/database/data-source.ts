import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TlsOptions } from 'tls';
import { config } from 'dotenv';
config();

const common = {
  type: 'postgres' as const,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  // Migrations no padrão Aurora (database/migrations/)
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false, // nunca em prod
  migrationsRun: false, // rode pelos scripts
  logging: process.env.DB_LOGGING === 'true',
  applicationName: 'patrimonio-inventario',
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
      url: process.env.DATABASE_URL, // usando URL completa
      ssl: sslOptions,
    }
  : {
      ...common,
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
      ssl: sslOptions,
    };

export const AppDataSource = new DataSource(options);
