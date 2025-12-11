-- Script para criar o banco de dados do patrimonio-service
-- Execute este script conectando-se ao PostgreSQL como superusuário

-- Conecte-se ao PostgreSQL como superusuário
-- psql -U postgres

-- Criar banco de dados
CREATE DATABASE patrimonio;

-- Conceder permissões (ajuste conforme necessário)
-- GRANT ALL PRIVILEGES ON DATABASE patrimonio TO postgres;

-- Comentário: Após criar o banco, execute as migrations quando disponíveis
-- npm run migration:run




