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
config();

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
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
      ssl: sslOptions,
    };

export const AppDataSource = new DataSource(options);
