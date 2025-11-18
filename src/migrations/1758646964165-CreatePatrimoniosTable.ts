import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePatrimoniosTable1758646964165 implements MigrationInterface {
  name = 'CreatePatrimoniosTable1758646964165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela patrimonios
    await queryRunner.createTable(
      new Table({
        name: 'patrimonios',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'codigo',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'categoria',
            type: 'varchar',
            length: '50',
            isNullable: false,
            default: "'EQUIPAMENTO'",
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            isNullable: false,
            default: "'ATIVO'",
          },
          {
            name: 'valor_aquisicao',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'data_aquisicao',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'fornecedor',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'numero_serie',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'modelo',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'marca',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'localizacao',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'observacoes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'responsavel_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'version',
            type: 'int',
            default: 1,
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Criar índices
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "uq_patrimonios_codigo" ON "patrimonios" ("codigo")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_categoria" ON "patrimonios" ("categoria")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_status" ON "patrimonios" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_responsavel" ON "patrimonios" ("responsavel_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_nome" ON "patrimonios" ("nome")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_marca" ON "patrimonios" ("marca")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_modelo" ON "patrimonios" ("modelo")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_localizacao" ON "patrimonios" ("localizacao")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_data_aquisicao" ON "patrimonios" ("data_aquisicao")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "idx_patrimonios_valor_aquisicao" ON "patrimonios" ("valor_aquisicao")`,
    );

    // Criar foreign key para responsável
    await queryRunner.query(`
      ALTER TABLE "patrimonios" 
      ADD CONSTRAINT "fk_patrimonios_responsavel" 
      FOREIGN KEY ("responsavel_id") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL 
      ON UPDATE CASCADE
    `);

    // Adicionar constraint para categoria
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'chk_patrimonios_categoria'
        ) THEN
          ALTER TABLE "patrimonios"
          ADD CONSTRAINT "chk_patrimonios_categoria"
          CHECK (categoria IN ('EQUIPAMENTO', 'MOBILIARIO', 'VEICULO', 'IMOVEL', 'OUTROS'));
        END IF;
      END$$;
    `);

    // Adicionar constraint para status
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'chk_patrimonios_status'
        ) THEN
          ALTER TABLE "patrimonios"
          ADD CONSTRAINT "chk_patrimonios_status"
          CHECK (status IN ('ATIVO', 'INATIVO', 'MANUTENCAO', 'DESCARTADO'));
        END IF;
      END$$;
    `);

    // Adicionar constraint para valor de aquisição
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'chk_patrimonios_valor_aquisicao'
        ) THEN
          ALTER TABLE "patrimonios"
          ADD CONSTRAINT "chk_patrimonios_valor_aquisicao"
          CHECK (valor_aquisicao IS NULL OR valor_aquisicao >= 0);
        END IF;
      END$$;
    `);

    console.log('✅ Tabela patrimonios criada com sucesso');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign key
    await queryRunner.query(
      `ALTER TABLE "patrimonios" DROP CONSTRAINT IF EXISTS "fk_patrimonios_responsavel"`,
    );

    // Remover constraints
    await queryRunner.query(
      `ALTER TABLE "patrimonios" DROP CONSTRAINT IF EXISTS "chk_patrimonios_categoria"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patrimonios" DROP CONSTRAINT IF EXISTS "chk_patrimonios_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patrimonios" DROP CONSTRAINT IF EXISTS "chk_patrimonios_valor_aquisicao"`,
    );

    // Remover índices
    await queryRunner.query(`DROP INDEX IF EXISTS "uq_patrimonios_codigo"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_categoria"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_status"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_patrimonios_responsavel"`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_nome"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_marca"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_modelo"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_patrimonios_localizacao"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_patrimonios_data_aquisicao"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_patrimonios_valor_aquisicao"`,
    );

    // Remover tabela
    await queryRunner.dropTable('patrimonios');

    console.log('❌ Tabela patrimonios removida');
  }
}
