import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { TlsOptions } from 'tls';
import { config } from 'dotenv';
// Importar entidades principais explicitamente para garantir que os relacionamentos sejam resolvidos corretamente
// O TypeORM precisa que a entidade Patrimonio seja carregada antes de PatrimonioLocalizacaoHistorico
// para resolver corretamente o relacionamento ManyToOne
// Isso também evita conflitos com outras entidades que usam o mesmo nome de tabela
import { Patrimonio } from '../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import { Categoria } from '../../packages/categorias-service/src/categorias/entities/categoria.entity';
import { AuditLog } from '../../packages/audit-service/src/audit/entities/audit-log.entity';
config();

const isTest = process.env.NODE_ENV === 'test';

// Helper para aplicar defaults seguros em ambiente de teste (CI)
function envOrDefault(key: string, fallback: string) {
  const val = process.env[key];
  if (isTest) return val && val.trim().length > 0 ? val : fallback;
  return val && val.trim().length > 0 ? val : fallback;
}

// Em ambiente de teste, forçar o uso do banco de teste, mesmo que o .env tenha outro valor.
function getDbName() {
  if (isTest) {
    return 'patrimonio_inventario_test';
  }
  return envOrDefault('DB_NAME', 'patrimonio_inventario');
}

const common = {
  type: 'postgres' as const,
  // IMPORTANTE: Para entidades com relações ManyToOne, o TypeORM precisa que ambas as entidades
  // estejam carregadas antes de processar as relações. Usamos imports explícitos para garantir ordem.
  // O padrão glob pode carregar as entidades em ordem diferente, causando erro de metadata não encontrada.
  entities: [
    // IMPORTANTE: Para relações ManyToOne, o TypeORM precisa que a entidade alvo esteja registrada
    // antes da entidade que referencia. Importamos explicitamente para garantir ordem de carregamento.
    // As entidades Patrimonio e PatrimonioLocalizacaoHistorico são carregadas explicitamente aqui
    // para garantir que Patrimonio seja registrado antes de PatrimonioLocalizacaoHistorico.
    Patrimonio, // Alvo da relação - deve estar registrado primeiro
    PatrimonioLocalizacaoHistorico, // Referencia Patrimonio - depende de Patrimonio estar registrado
    // Entidades de módulos adicionais usados nos testes E2E
    Categoria,
    AuditLog,
    // Carregar outras entidades via padrão
    // Nota: TypeORM automaticamente ignora entidades duplicadas baseado no nome da tabela/entidade
    __dirname + '/../**/*.entity.{ts,js}',
  ],
  // Migrations apenas no padrão Aurora (database/migrations/)
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
      host: envOrDefault('DB_HOST', 'localhost'),
      port: parseInt(envOrDefault('DB_PORT', '5432'), 10),
      username: envOrDefault('DB_USER', 'postgres'),
      password: envOrDefault('DB_PASS', 'postgres'),
      database: getDbName(),
      ssl: sslOptions,
    };

export const AppDataSource = new DataSource(options);
