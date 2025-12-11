// Configuração específica para testes E2E: libera guards de auth/roles
process.env.BYPASS_AUTH = 'true';
process.env.E2E = 'true';

