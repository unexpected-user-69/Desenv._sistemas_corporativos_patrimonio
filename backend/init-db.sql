-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS citext;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  email citext NOT NULL,
  password_hash varchar(255) NOT NULL,
  role varchar(32) NOT NULL DEFAULT 'STUDENT',
  is_active boolean NOT NULL DEFAULT true,
  avatar_url varchar(500),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  deleted_at timestamptz,
  version int NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email ON users(email);

-- Criar tabela de patrimônios
CREATE TABLE IF NOT EXISTS patrimonios (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo varchar(50) UNIQUE NOT NULL,
  nome varchar(255) NOT NULL,
  descricao text,
  categoria varchar(32) NOT NULL DEFAULT 'EQUIPAMENTO',
  status varchar(32) NOT NULL DEFAULT 'ATIVO',
  marca varchar(100),
  modelo varchar(100),
  numero_serie varchar(100),
  valor_aquisicao decimal(10,2),
  data_aquisicao date,
  data_garantia date,
  localizacao varchar(255),
  responsavel_id uuid,
  observacoes text,
  foto_url varchar(500),
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamp with time zone,
  version int NOT NULL DEFAULT 1
);

-- Índices para patrimônios
CREATE UNIQUE INDEX IF NOT EXISTS uq_patrimonios_codigo ON patrimonios(codigo);
CREATE INDEX IF NOT EXISTS idx_patrimonios_categoria ON patrimonios(categoria);
CREATE INDEX IF NOT EXISTS idx_patrimonios_status ON patrimonios(status);
CREATE INDEX IF NOT EXISTS idx_patrimonios_responsavel ON patrimonios(responsavel_id);

-- Constraints para patrimônios
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_patrimonios_categoria') THEN
    ALTER TABLE patrimonios 
    ADD CONSTRAINT chk_patrimonios_categoria 
    CHECK (categoria IN ('EQUIPAMENTO', 'MOBILIARIO', 'VEICULO', 'IMOVEL', 'SOFTWARE', 'OUTROS'));
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_patrimonios_status') THEN
    ALTER TABLE patrimonios 
    ADD CONSTRAINT chk_patrimonios_status 
    CHECK (status IN ('ATIVO', 'INATIVO', 'MANUTENCAO', 'DESCARTADO'));
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_patrimonios_valor_aquisicao') THEN
    ALTER TABLE patrimonios 
    ADD CONSTRAINT chk_patrimonios_valor_aquisicao 
    CHECK (valor_aquisicao >= 0);
  END IF;
END $$;

-- Criar tabela de logs de auditoria
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type varchar(100) NOT NULL,
  entity_id varchar(255) NOT NULL,
  action varchar(50) NOT NULL,
  user_id uuid,
  ip_address varchar(45),
  user_agent text,
  changes jsonb,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Criar tabela de migrações do TypeORM
CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL PRIMARY KEY,
  timestamp bigint NOT NULL,
  name varchar(255) NOT NULL
);

-- Registrar migrações executadas
INSERT INTO migrations (timestamp, name) VALUES
  (1758646964161, 'UsersInit1758646964161'),
  (1758646964162, 'AddUserAuditFields1758646964162'),
  (1758646964162, 'CreatePatrimoniosTable1758646964162')
ON CONFLICT DO NOTHING;

