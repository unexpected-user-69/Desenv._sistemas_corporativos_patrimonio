#!/usr/bin/env ts-node

/**
 * Script para executar migrações do banco de dados
 * Baseado no projeto de referência do professor
 * 
 * Uso:
 *   npm run migration:run
 *   npx ts-node scripts/run-migrations.ts
 *   node dist/scripts/run-migrations.js
 */

import { AppDataSource } from '../src/database/data-source';
import { Logger } from '@nestjs/common';

const logger = new Logger('MigrationRunner');

async function runMigrations(): Promise<void> {
  try {
    logger.log('🔄 Iniciando execução de migrações...');

    // Verificar se a conexão está inicializada
    if (!AppDataSource.isInitialized) {
      logger.log('📡 Conectando ao banco de dados...');
      await AppDataSource.initialize();
      logger.log('✅ Conexão com banco de dados estabelecida');
    }

    // Verificar conexão
    await AppDataSource.query('SELECT 1');
    logger.log('✅ Conexão com banco de dados verificada');

    // Executar migrações pendentes
    logger.log('🚀 Executando migrações pendentes...');
    const migrations = await AppDataSource.runMigrations();

    if (migrations.length === 0) {
      logger.log('✅ Nenhuma migração pendente encontrada');
    } else {
      logger.log(`✅ ${migrations.length} migração(ões) executada(s) com sucesso:`);
      migrations.forEach((migration, index) => {
        logger.log(`  ${index + 1}. ${migration.name}`);
      });
    }

    // Verificar status das migrações
    const executedMigrations = await AppDataSource.query(`
      SELECT name, timestamp 
      FROM migrations 
      ORDER BY timestamp DESC
    `);

    logger.log(`📊 Total de migrações executadas: ${executedMigrations.length}`);
    
    if (executedMigrations.length > 0) {
      logger.log('📋 Últimas migrações executadas:');
      executedMigrations.slice(0, 5).forEach((migration: any, index: number) => {
        const date = new Date(parseInt(migration.timestamp)).toLocaleString();
        logger.log(`  ${index + 1}. ${migration.name} (${date})`);
      });
    }

    logger.log('🎉 Execução de migrações concluída com sucesso!');

  } catch (error) {
    logger.error('❌ Erro ao executar migrações:', error);
    
    if (error instanceof Error) {
      logger.error('📝 Detalhes do erro:', error.message);
      logger.error('📍 Stack trace:', error.stack);
    }

    // Verificar se é erro de conexão
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
      logger.error('🔌 Erro de conexão: Verifique se o banco de dados está rodando');
      logger.error('💡 Execute: docker-compose up db -d');
    }

    // Verificar se é erro de autenticação
    if (error instanceof Error && error.message.includes('password authentication failed')) {
      logger.error('🔐 Erro de autenticação: Verifique as credenciais do banco de dados');
      logger.error('💡 Verifique o arquivo .env');
    }

    process.exit(1);
  } finally {
    // Fechar conexão
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.log('🔌 Conexão com banco de dados fechada');
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runMigrations()
    .then(() => {
      logger.log('✨ Script de migrações finalizado');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('💥 Falha crítica no script de migrações:', error);
      process.exit(1);
    });
}

export { runMigrations };
