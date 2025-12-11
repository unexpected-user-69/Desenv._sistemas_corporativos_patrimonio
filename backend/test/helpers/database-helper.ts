/**
 * Helper para operações de banco de dados em testes E2E
 */

import { DataSource } from 'typeorm';

/**
 * Cria um usuário de teste diretamente no banco de dados
 */
export async function createTestUserInDB(
  dataSource: DataSource,
  userId: string,
): Promise<void> {
  try {
    await dataSource.query(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, 'Usuário Teste', 'teste@test.com', 'hash', 'ADMIN', true, NOW(), NOW())
       ON CONFLICT (id) DO NOTHING`,
      [userId],
    );
  } catch (error) {
    // Usuário pode já existir, ignorar
  }
}

/**
 * Limpa dados de teste do banco de dados
 */
export async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpar dados de teste (opcional, pode deixar para análise)
    // await dataSource.query(`DELETE FROM notification_logs WHERE event_key LIKE 'test.%'`);
    // await dataSource.query(`DELETE FROM notification_templates WHERE key LIKE 'test.%'`);
    // await dataSource.query(`DELETE FROM notification_policies WHERE event_key LIKE 'events.test.%'`);
    // await dataSource.query(`DELETE FROM webhooks WHERE name LIKE 'Webhook%'`);
  } catch (error) {
    // Ignorar erros de limpeza
  }
}


