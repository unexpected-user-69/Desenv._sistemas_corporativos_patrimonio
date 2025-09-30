/**
 * Setup global para testes
 * Baseado no PDF 086: Implementações para Testes Unitários
 */

import { setupTestEnvironment } from './utils/test-doubles';

// Configurar ambiente de teste global
setupTestEnvironment();

// Configurações globais do Jest
beforeAll(() => {
  // Configurações que devem ser executadas uma vez antes de todos os testes
  console.log('🚀 Iniciando suite de testes avançados (PDF 086)');
});

afterAll(() => {
  // Limpeza final
  console.log('✅ Suite de testes finalizada');
});

// Configurações específicas para cada teste
beforeEach(() => {
  // Reset de mocks globais
  jest.clearAllMocks();
});

afterEach(() => {
  // Limpeza após cada teste
  jest.restoreAllMocks();
});

// Configuração de timeout global
jest.setTimeout(10000);

// Configuração para detectar handles abertos
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Configuração para detectar exceções não capturadas
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
