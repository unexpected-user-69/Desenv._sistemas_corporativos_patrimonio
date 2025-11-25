-- ============================================
-- Script de Criação de Schemas para Microserviços
-- ============================================
-- Este script cria schemas separados no PostgreSQL para cada microserviço
-- Permitindo isolamento lógico dos dados enquanto mantém o mesmo banco físico
--
-- Uso:
--   psql -U postgres -d patrimonio_inventario -f create-schemas.sql
--   ou via docker:
--   docker-compose exec db psql -U postgres -d patrimonio_inventario -f /path/to/create-schemas.sql
-- ============================================

-- Criar schemas para cada microserviço
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS events;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS categorias;
CREATE SCHEMA IF NOT EXISTS patrimonio;

-- Conceder permissões ao usuário postgres (ajustar conforme necessário)
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

-- Definir schema padrão para o usuário (opcional)
-- ALTER USER postgres SET search_path TO public, auth, users, events, audit, categorias, patrimonio;

-- Verificar schemas criados
SELECT 
    schema_name,
    schema_owner
FROM information_schema.schemata 
WHERE schema_name IN ('auth', 'users', 'events', 'audit', 'categorias', 'patrimonio')
ORDER BY schema_name;

-- Mensagem de sucesso
DO $$
BEGIN
    RAISE NOTICE 'Schemas criados com sucesso!';
    RAISE NOTICE 'Schemas disponíveis: auth, users, events, audit, categorias, patrimonio';
END $$;

