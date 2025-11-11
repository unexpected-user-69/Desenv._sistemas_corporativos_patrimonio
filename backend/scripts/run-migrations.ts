#!/usr/bin/env ts-node

/**
 * Script para executar migrações do banco de dados
 * Baseado no projeto de referência do professor
 * 
 * Melhorado para lidar com índices duplicados e erros de execução
 * 
 * Uso:
 *   npm run migration:run
 *   npx ts-node scripts/run-migrations.ts
 *   node dist/scripts/run-migrations.js
 */

import { AppDataSource } from '../src/database/data-source';
import { Logger } from '@nestjs/common';

const logger = new Logger('MigrationRunner');

/**
 * Limpa índices duplicados conhecidos que podem causar problemas
 */
async function cleanDuplicateIndexes(): Promise<void> {
  const problematicIndexes = [
    'ux_connectors_key',
    'ix_executions_connector_status_started_at',
    'ix_executions_created_by_started_at',
    'ix_execution_logs_execution_created_at',
    'ix_execution_logs_execution_level',
    'ix_maintenance_plans_categoria',
    'ix_maintenance_plans_owner',
    'ix_maintenance_plans_status',
    'ix_work_orders_plan',
    'ix_work_orders_status',
    'ix_work_orders_priority',
    'ix_work_orders_status_opened_at',
    'ix_work_orders_patrimonio_status',
    'ix_work_orders_owner_opened_at',
    'ix_work_orders_priority_due_date',
    'ix_work_logs_work_order',
    'ix_work_logs_work_order_created_at',
    'ix_parts_work_order',
    'ix_parts_work_order_part_number',
    'ix_notification_templates_type_active',
    'ix_notification_templates_name',
    'ix_notification_templates_key_version',
    'ix_notification_templates_channel',
    'ix_notification_policies_event_key',
    'ix_notification_policies_enabled',
    'ix_webhooks_enabled',
    'ix_notification_logs_channel_status_created_at',
    'ix_notification_logs_event_key',
    'ix_report_requests_status_created_at',
    'ix_report_requests_user_id',
    'ix_report_requests_created_by_created_at',
    'ix_report_artifacts_request_id',
    'ix_report_artifacts_expires_at',
    'ix_report_catalogs_active',
    'ix_report_catalog_versions_catalog_id',
    'ix_report_permissions_catalog_id',
    'ix_report_permissions_user_id',
    'ix_report_quotas_user_id',
  ];

  let cleanedCount = 0;
  for (const indexName of problematicIndexes) {
    try {
      await AppDataSource.query(`DROP INDEX IF EXISTS ${indexName} CASCADE;`);
      cleanedCount++;
    } catch (error) {
      // Ignorar erros de índice não encontrado
    }
  }

  if (cleanedCount > 0) {
    logger.log(`🧹 ${cleanedCount} índice(s) duplicado(s) removido(s)`);
  }
}

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

    // Limpar índices duplicados antes de executar migrations
    logger.log('🧹 Verificando índices duplicados...');
    await cleanDuplicateIndexes();

    // Executar migrações pendentes com retry
    logger.log('🚀 Executando migrações pendentes...');
    let migrations: any[] = [];
    let retries = 3;
    let lastError: Error | null = null;

    while (retries > 0) {
      try {
        migrations = await AppDataSource.runMigrations();
        break; // Sucesso, sair do loop
      } catch (error: any) {
        lastError = error;
        
        // Verificar se é erro de índice duplicado
        if (error?.message?.includes('already exists') || error?.driverError?.code === '42P07') {
          logger.warn('⚠️  Erro de índice duplicado detectado. Limpando índices...');
          await cleanDuplicateIndexes();
          retries--;
          if (retries > 0) {
            logger.log(`🔄 Tentando novamente... (${3 - retries + 1}/3)`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Aguardar 2 segundos
            continue;
          }
        }
        
        // Se não for erro de índice ou acabaram as tentativas, lançar erro
        throw error;
      }
    }

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
      
      // Verificar se é erro de conexão
      if (error.message.includes('ECONNREFUSED')) {
        logger.error('🔌 Erro de conexão: Verifique se o banco de dados está rodando');
        logger.error('💡 Execute: docker-compose up db -d');
      }
      
      // Verificar se é erro de autenticação
      if (error.message.includes('password authentication failed')) {
        logger.error('🔐 Erro de autenticação: Verifique as credenciais do banco de dados');
        logger.error('💡 Verifique o arquivo .env');
      }
      
      // Verificar se é erro de índice duplicado
      if (error.message.includes('already exists') || (error as any)?.driverError?.code === '42P07') {
        logger.error('🔧 Erro de índice duplicado detectado');
        logger.error('💡 Tente executar novamente ou limpe os índices manualmente');
      }
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
