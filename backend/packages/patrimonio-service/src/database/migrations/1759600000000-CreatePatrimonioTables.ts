import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatrimonioTables1759600000000 implements MigrationInterface {
  name = 'CreatePatrimonioTables1759600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar schema patrimonio se não existir
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS patrimonio;`);

    // Criar enum para PatrimonioStatus
    await queryRunner.query(`
      CREATE TYPE patrimonio.patrimonio_status AS ENUM ('ATIVO', 'INATIVO', 'MANUTENCAO', 'DESCARTADO');
    `);

    // Criar tabela patrimonios
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS patrimonio.patrimonios (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        codigo varchar(50) NOT NULL,
        nome varchar(255) NOT NULL,
        descricao text,
        categoria_id uuid,
        status patrimonio.patrimonio_status NOT NULL DEFAULT 'ATIVO',
        valor_aquisicao decimal(10,2),
        data_aquisicao date,
        data_garantia date,
        numero_serie varchar(255),
        modelo varchar(255),
        marca varchar(255),
        localizacao varchar(255),
        observacoes text,
        foto_url varchar(500),
        responsavel_id uuid,
        created_at timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW(),
        deleted_at timestamptz,
        version int NOT NULL DEFAULT 1
      );
    `);

    // Criar índices para patrimonios
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_patrimonios_codigo 
      ON patrimonio.patrimonios(codigo);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_patrimonios_categoria_id 
      ON patrimonio.patrimonios(categoria_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_patrimonios_status 
      ON patrimonio.patrimonios(status);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_patrimonios_responsavel 
      ON patrimonio.patrimonios(responsavel_id);
    `);

    // Criar tabela patrimonio_localizacao_historico
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS patrimonio.patrimonio_localizacao_historico (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        patrimonio_id uuid NOT NULL,
        localizacao_anterior varchar(255),
        localizacao_nova varchar(255) NOT NULL,
        data_mudanca timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        usuario_id uuid,
        observacoes text,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar índices para patrimonio_localizacao_historico
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_patrimonio_localizacao_historico_patrimonio_id 
      ON patrimonio.patrimonio_localizacao_historico(patrimonio_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_patrimonio_localizacao_historico_data_mudanca 
      ON patrimonio.patrimonio_localizacao_historico(data_mudanca);
    `);

    // Criar foreign key entre patrimonio_localizacao_historico e patrimonios
    await queryRunner.query(`
      ALTER TABLE patrimonio.patrimonio_localizacao_historico 
      ADD CONSTRAINT FK_patrimonio_localizacao_historico_patrimonio 
      FOREIGN KEY (patrimonio_id) 
      REFERENCES patrimonio.patrimonios(id) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign key
    await queryRunner.query(`
      ALTER TABLE patrimonio.patrimonio_localizacao_historico 
      DROP CONSTRAINT IF EXISTS FK_patrimonio_localizacao_historico_patrimonio;
    `);

    // Remover índices de patrimonio_localizacao_historico
    await queryRunner.query(`
      DROP INDEX IF EXISTS patrimonio.idx_patrimonio_localizacao_historico_data_mudanca;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS patrimonio.idx_patrimonio_localizacao_historico_patrimonio_id;
    `);

    // Remover tabela patrimonio_localizacao_historico
    await queryRunner.query(`
      DROP TABLE IF EXISTS patrimonio.patrimonio_localizacao_historico;
    `);

    // Remover índices de patrimonios
    await queryRunner.query(`
      DROP INDEX IF EXISTS patrimonio.idx_patrimonios_responsavel;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS patrimonio.idx_patrimonios_status;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS patrimonio.idx_patrimonios_categoria_id;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS patrimonio.uq_patrimonios_codigo;
    `);

    // Remover tabela patrimonios
    await queryRunner.query(`
      DROP TABLE IF EXISTS patrimonio.patrimonios;
    `);

    // Remover enum PatrimonioStatus
    await queryRunner.query(`
      DROP TYPE IF EXISTS patrimonio.patrimonio_status;
    `);

    // Remover schema patrimonio (opcional - comentado para não remover se houver outros objetos)
    // await queryRunner.query(`DROP SCHEMA IF EXISTS patrimonio CASCADE;`);
  }
}

