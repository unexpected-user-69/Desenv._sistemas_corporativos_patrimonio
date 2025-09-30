import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

// Configuração de conexão com PostgreSQL
// Baseado em PDF 084 - Containerização e Configuração
const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? 5432);
const username = process.env.DB_USER ?? 'postgres';
const password = process.env.DB_PASS ?? 'postgres';
const database = process.env.DB_NAME ?? 'patrimonio_inventario';

// Export nomeado para compatibilidade com TypeORM CLI
export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});

export default dataSource;
