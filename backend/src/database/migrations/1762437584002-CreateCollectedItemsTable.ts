import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateCollectedItemsTable1762437584002 implements MigrationInterface {
  name = 'CreateCollectedItemsTable1762437584002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collected_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'assignment_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'patrimonio_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'codigo_lido',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'tipo_leitura',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'coletado_em',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'geo',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'offline_batch_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'version',
            type: 'int',
            default: 1,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'collected_items',
      new TableForeignKey({
        columnNames: ['assignment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'assignments',
        onDelete: 'CASCADE',
        name: 'fk_collected_items_assignment',
      }),
    );

    // Foreign key opcional para patrimonio (pode não existir ainda)
    // Nota: A tabela patrimonio pode ter nome diferente, ajustar se necessário
    try {
      await queryRunner.createForeignKey(
        'collected_items',
        new TableForeignKey({
          columnNames: ['patrimonio_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'patrimonios',
          onDelete: 'SET NULL',
          name: 'fk_collected_items_patrimonio',
        }),
      );
    } catch (_error) {
      // Se a tabela patrimonio não existir, apenas logar o erro
      console.warn('Foreign key para patrimonio não criada (tabela pode não existir ainda)');
    }

    // Constraint de check para tipo_leitura
    await queryRunner.query(`
      ALTER TABLE collected_items 
      ADD CONSTRAINT chk_collected_items_tipo_leitura 
      CHECK (tipo_leitura IN ('qrcode', 'rfid'))
    `);

    // Índices
    await queryRunner.createIndex(
      'collected_items',
      new TableIndex({
        name: 'ix_collected_items_assignment_coletado',
        columnNames: ['assignment_id', 'coletado_em'],
      }),
    );

    await queryRunner.createIndex(
      'collected_items',
      new TableIndex({
        name: 'ix_collected_items_patrimonio_coletado',
        columnNames: ['patrimonio_id', 'coletado_em'],
      }),
    );

    await queryRunner.createIndex(
      'collected_items',
      new TableIndex({
        name: 'ix_collected_items_offline_batch',
        columnNames: ['offline_batch_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE collected_items DROP CONSTRAINT IF EXISTS chk_collected_items_tipo_leitura`,
    );
    await queryRunner.dropIndex('collected_items', 'ix_collected_items_offline_batch');
    await queryRunner.dropIndex('collected_items', 'ix_collected_items_patrimonio_coletado');
    await queryRunner.dropIndex('collected_items', 'ix_collected_items_assignment_coletado');
    try {
      await queryRunner.dropForeignKey('collected_items', 'fk_collected_items_patrimonio');
    } catch (_error) {
      // Ignorar se não existir
    }
    await queryRunner.dropForeignKey('collected_items', 'fk_collected_items_assignment');
    await queryRunner.dropTable('collected_items');
  }
}

