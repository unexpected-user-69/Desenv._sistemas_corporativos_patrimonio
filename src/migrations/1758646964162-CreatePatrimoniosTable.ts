import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePatrimoniosTable1758646964162 implements MigrationInterface {
  name = 'CreatePatrimoniosTable1758646964162';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
            length: '32',
            isNullable: false,
            default: "'EQUIPAMENTO'",
          },
          {
            name: 'status',
            type: 'varchar',
            length: '32',
            isNullable: false,
            default: "'ATIVO'",
          },
          {
            name: 'marca',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'modelo',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'numero_serie',
            type: 'varchar',
            length: '100',
            isNullable: true,
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
            name: 'data_garantia',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'localizacao',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'responsavel_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'observacoes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'foto_url',
            type: 'varchar',
            length: '500',
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

    // Criar índices usando SQL direto
    await queryRunner.query(
      `CREATE UNIQUE INDEX "uq_patrimonios_codigo" ON "patrimonios" ("codigo")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_patrimonios_categoria" ON "patrimonios" ("categoria")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_patrimonios_status" ON "patrimonios" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_patrimonios_responsavel" ON "patrimonios" ("responsavel_id")`,
    );

    // Criar constraint de check para categoria
    await queryRunner.query(`
      ALTER TABLE patrimonios 
      ADD CONSTRAINT chk_patrimonios_categoria 
      CHECK (categoria IN ('EQUIPAMENTO', 'MOBILIARIO', 'VEICULO', 'IMOVEL', 'SOFTWARE', 'OUTROS'))
    `);

    // Criar constraint de check para status
    await queryRunner.query(`
      ALTER TABLE patrimonios 
      ADD CONSTRAINT chk_patrimonios_status 
      CHECK (status IN ('ATIVO', 'INATIVO', 'MANUTENCAO', 'DESCARTADO'))
    `);

    // Criar constraint de check para valor_aquisicao
    await queryRunner.query(`
      ALTER TABLE patrimonios 
      ADD CONSTRAINT chk_patrimonios_valor_aquisicao 
      CHECK (valor_aquisicao >= 0)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover constraints
    await queryRunner.query(
      `ALTER TABLE patrimonios DROP CONSTRAINT IF EXISTS chk_patrimonios_valor_aquisicao`,
    );
    await queryRunner.query(
      `ALTER TABLE patrimonios DROP CONSTRAINT IF EXISTS chk_patrimonios_status`,
    );
    await queryRunner.query(
      `ALTER TABLE patrimonios DROP CONSTRAINT IF EXISTS chk_patrimonios_categoria`,
    );

    // Remover índices
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_patrimonios_responsavel"`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_patrimonios_categoria"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "uq_patrimonios_codigo"`);

    // Remover tabela
    await queryRunner.dropTable('patrimonios');
  }
}
