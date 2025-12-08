#!/usr/bin/env ts-node

/**
 * Script para executar migrações de todos os microserviços
 * 
 * Uso:
 *   npm run migration:run:all
 *   npx ts-node -r tsconfig-paths/register scripts/run-all-migrations.ts
 *   npx ts-node -r tsconfig-paths/register scripts/run-all-migrations.ts --service users-service
 */

import { Logger } from '@nestjs/common';
import * as path from 'path';

const logger = new Logger('AllMigrationsRunner');

interface ServiceConfig {
  name: string;
  dataSourcePath: string;
  displayName: string;
}

const services: ServiceConfig[] = [
  {
    name: 'users-service',
    dataSourcePath: '../packages/users-service/src/database/data-source',
    displayName: 'Users Service',
  },
  {
    name: 'auth-service',
    dataSourcePath: '../packages/auth-service/src/database/data-source',
    displayName: 'Auth Service',
  },
  {
    name: 'events-service',
    dataSourcePath: '../packages/events-service/src/database/data-source',
    displayName: 'Events Service',
  },
  {
    name: 'audit-service',
    dataSourcePath: '../packages/audit-service/src/database/data-source',
    displayName: 'Audit Service',
  },
  {
    name: 'categorias-service',
    dataSourcePath: '../packages/categorias-service/src/database/data-source',
    displayName: 'Categorias Service',
  },
  {
    name: 'patrimonio-service',
    dataSourcePath: '../packages/patrimonio-service/src/database/data-source',
    displayName: 'Patrimonio Service',
  },
];

async function runServiceMigrations(service: ServiceConfig): Promise<boolean> {
  try {
    logger.log(`\n🔄 [${service.displayName}] Iniciando migrações...`);

    // Importar dinamicamente o AppDataSource do serviço
    const dataSourceModule = require(path.resolve(__dirname, service.dataSourcePath));
    const AppDataSource = dataSourceModule.AppDataSource;

    if (!AppDataSource) {
      logger.error(`❌ [${service.displayName}] AppDataSource não encontrado`);
      return false;
    }

    // Verificar se a conexão está inicializada
    if (!AppDataSource.isInitialized) {
      logger.log(`📡 [${service.displayName}] Conectando ao banco de dados...`);
      await AppDataSource.initialize();
      logger.log(`✅ [${service.displayName}] Conexão estabelecida`);
    }

    // Verificar conexão
    await AppDataSource.query('SELECT 1');
    logger.log(`✅ [${service.displayName}] Conexão verificada`);

    // Executar migrações pendentes
    logger.log(`🚀 [${service.displayName}] Executando migrações pendentes...`);
    const migrations = await AppDataSource.runMigrations();

    if (migrations.length === 0) {
      logger.log(`✅ [${service.displayName}] Nenhuma migração pendente`);
    } else {
      logger.log(`✅ [${service.displayName}] ${migrations.length} migração(ões) executada(s):`);
      migrations.forEach((migration: any, index: number) => {
        logger.log(`  ${index + 1}. ${migration.name}`);
      });
    }

    // Fechar conexão
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.log(`🔌 [${service.displayName}] Conexão fechada`);
    }

    return true;
  } catch (error: any) {
    logger.error(`❌ [${service.displayName}] Erro ao executar migrações:`, error.message);

    // Verificar se é erro de conexão
    if (error.message?.includes('ECONNREFUSED')) {
      logger.error(`🔌 [${service.displayName}] Erro de conexão: Verifique se o banco de dados está rodando`);
    }

    // Verificar se é erro de autenticação
    if (error.message?.includes('password authentication failed')) {
      logger.error(`🔐 [${service.displayName}] Erro de autenticação: Verifique as credenciais`);
    }

    // Verificar se é erro de schema não encontrado
    if (error.message?.includes('schema') || error.message?.includes('does not exist')) {
      logger.warn(`⚠️  [${service.displayName}] Schema pode não existir. Criando automaticamente...`);
      // Tentar criar o schema se necessário
      try {
        const dataSourceModule = require(path.resolve(__dirname, service.dataSourcePath));
        const AppDataSource = dataSourceModule.AppDataSource;
        if (AppDataSource.isInitialized) {
          const schema = AppDataSource.options.schema || service.name;
          await AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
          logger.log(`✅ [${service.displayName}] Schema ${schema} criado`);
          // Tentar novamente
          const migrations = await AppDataSource.runMigrations();
          if (migrations.length > 0) {
            logger.log(`✅ [${service.displayName}] ${migrations.length} migração(ões) executada(s) após criar schema`);
            return true;
          }
        }
      } catch (retryError) {
        logger.error(`❌ [${service.displayName}] Erro ao criar schema:`, retryError);
      }
    }

    return false;
  }
}

async function runAllMigrations(serviceFilter?: string): Promise<void> {
  try {
    logger.log('🚀 Iniciando execução de migrações de todos os microserviços...\n');

    const servicesToRun = serviceFilter
      ? services.filter((s) => s.name === serviceFilter)
      : services;

    if (serviceFilter && servicesToRun.length === 0) {
      logger.error(`❌ Serviço "${serviceFilter}" não encontrado`);
      logger.log('📋 Serviços disponíveis:');
      services.forEach((s) => logger.log(`  - ${s.name}`));
      process.exit(1);
    }

    const results: { service: string; success: boolean }[] = [];

    for (const service of servicesToRun) {
      const success = await runServiceMigrations(service);
      results.push({ service: service.name, success });

      // Pequena pausa entre serviços
      if (servicesToRun.indexOf(service) < servicesToRun.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Resumo final
    logger.log('\n📊 Resumo da execução:');
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    results.forEach((result) => {
      const icon = result.success ? '✅' : '❌';
      const serviceName = services.find((s) => s.name === result.service)?.displayName || result.service;
      logger.log(`  ${icon} ${serviceName}`);
    });

    logger.log(`\n✅ Sucesso: ${successful}/${results.length}`);
    if (failed > 0) {
      logger.warn(`⚠️  Falhas: ${failed}/${results.length}`);
      process.exit(1);
    } else {
      logger.log('🎉 Todas as migrações foram executadas com sucesso!');
    }
  } catch (error) {
    logger.error('💥 Falha crítica ao executar migrações:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2);
  const serviceArg = args.find((arg) => arg.startsWith('--service='));
  const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;

  runAllMigrations(serviceFilter)
    .then(() => {
      logger.log('✨ Script de migrações finalizado');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('💥 Falha crítica no script de migrações:', error);
      process.exit(1);
    });
}

export { runAllMigrations };

