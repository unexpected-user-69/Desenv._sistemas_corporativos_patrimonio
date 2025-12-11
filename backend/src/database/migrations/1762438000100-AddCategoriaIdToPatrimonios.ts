import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddCategoriaIdToPatrimonios1762438000100 implements MigrationInterface {
  name = 'AddCategoriaIdToPatrimonios1762438000100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verificar se a coluna categoria_id já existe
    const table = await queryRunner.getTable('patrimonios');
    const categoriaIdColumn = table?.findColumnByName('categoria_id');

    if (!categoriaIdColumn) {
      // Adicionar coluna categoria_id
      await queryRunner.addColumn(
        'patrimonios',
        new TableColumn({
          name: 'categoria_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      // Criar índice para categoria_id
      await queryRunner.createIndex(
        'patrimonios',
        new TableIndex({
          name: 'idx_patrimonios_categoria_id',
          columnNames: ['categoria_id'],
          isUnique: false,
        }),
      );

      // Criar foreign key para categorias (opcional, pode ser adicionada depois se necessário)
      // Não vamos adicionar a FK agora para evitar problemas com dados existentes
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índice
    const table = await queryRunner.getTable('patrimonios');
    const index = table?.indices.find((idx) => idx.name === 'idx_patrimonios_categoria_id');
    
    if (index) {
      await queryRunner.dropIndex('patrimonios', 'idx_patrimonios_categoria_id');
    }

    // Remover coluna categoria_id
    const categoriaIdColumn = table?.findColumnByName('categoria_id');
    if (categoriaIdColumn) {
      await queryRunner.dropColumn('patrimonios', 'categoria_id');
    }
  }
}


