-- ========================================================================
-- Inicialização do PostgreSQL - Sistema de Gestão de Patrimônio
-- ========================================================================
-- Este script cria os schemas necessários para cada microsserviço
-- Executado automaticamente pelo Docker quando o container é criado
-- ========================================================================

-- Criar schemas para cada microsserviço
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS patrimonio;
CREATE SCHEMA IF NOT EXISTS categorias;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS events;

-- Garantir que o usuário postgres tenha acesso a todos os schemas
GRANT ALL PRIVILEGES ON SCHEMA users TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA auth TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA patrimonio TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA categorias TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA audit TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA events TO postgres;

-- Criar extensão para UUIDs se ainda não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log de sucesso
DO $$
BEGIN
    RAISE NOTICE '✅ Schemas criados com sucesso!';
    RAISE NOTICE '   - users';
    RAISE NOTICE '   - auth';
    RAISE NOTICE '   - patrimonio';
    RAISE NOTICE '   - categorias';
    RAISE NOTICE '   - audit';
    RAISE NOTICE '   - events';
END $$;

