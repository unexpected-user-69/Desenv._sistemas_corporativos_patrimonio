import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCategoriasTable1758648000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela de categorias
    await queryRunner.createTable(
      new Table({
        name: 'categorias',
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
            length: '100',
            isNullable: false,
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'icone',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'cor',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Criar índices
    await queryRunner.createIndex(
      'categorias',
      new TableIndex({
        name: 'idx_categorias_codigo',
        columnNames: ['codigo'],
      }),
    );

    await queryRunner.createIndex(
      'categorias',
      new TableIndex({
        name: 'idx_categorias_ativo',
        columnNames: ['ativo'],
      }),
    );

    // Popular com categorias padrão
    await queryRunner.query(`
      INSERT INTO categorias (codigo, nome, descricao, icone, cor, ativo) VALUES
      ('EQUIPAMENTO', 'Equipamento', 'Equipamentos eletrônicos, computadores e periféricos', 'laptop', '#3B82F6', true),
      ('MOBILIARIO', 'Mobiliário', 'Móveis, cadeiras, mesas, armários', 'chair', '#8B5CF6', true),
      ('VEICULO', 'Veículo', 'Carros, motos, veículos em geral', 'car', '#F59E0B', true),
      ('IMOVEL', 'Imóvel', 'Terrenos, prédios, salas comerciais', 'building', '#10B981', true),
      ('SOFTWARE', 'Software', 'Licenças de software, sistemas', 'code', '#6366F1', true),
      ('OUTROS', 'Outros', 'Outros tipos de patrimônio', 'package', '#6B7280', true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índices
    await queryRunner.dropIndex('categorias', 'idx_categorias_ativo');
    await queryRunner.dropIndex('categorias', 'idx_categorias_codigo');

    // Remover tabela
    await queryRunner.dropTable('categorias');
  }
}


