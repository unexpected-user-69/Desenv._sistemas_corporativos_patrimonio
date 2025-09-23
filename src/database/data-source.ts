import 'reflect-metadata';
import { DataSource } from 'typeorm';

const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? 5432);
const username = process.env.DB_USER ?? 'postgres';
const password = process.env.DB_PASS ?? 'postgres';
const database = process.env.DB_NAME ?? 'patrimonio_inventario';

const dataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});

export default dataSource;

