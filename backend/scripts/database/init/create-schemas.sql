-- ============================================
-- Script de Inicialização Automática de Schemas
-- ============================================
-- Este arquivo será executado automaticamente pelo PostgreSQL
-- quando o container do banco for criado pela primeira vez
-- (apenas quando o volume estiver vazio)
-- ============================================

-- Criar schemas para cada microserviço
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS events;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS categorias;
CREATE SCHEMA IF NOT EXISTS patrimonio;

-- Conceder permissões ao usuário postgres
GRANT ALL PRIVILEGES ON SCHEMA auth TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA users TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA events TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA audit TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA categorias TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA patrimonio TO postgres;

-- Permitir criação de objetos nos schemas
GRANT CREATE ON SCHEMA auth TO postgres;
GRANT CREATE ON SCHEMA users TO postgres;
GRANT CREATE ON SCHEMA events TO postgres;
GRANT CREATE ON SCHEMA audit TO postgres;
GRANT CREATE ON SCHEMA categorias TO postgres;
GRANT CREATE ON SCHEMA patrimonio TO postgres;

