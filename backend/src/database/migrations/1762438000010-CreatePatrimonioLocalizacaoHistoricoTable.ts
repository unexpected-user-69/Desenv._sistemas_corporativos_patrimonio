import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatrimonioLocalizacaoHistoricoTable1762438000010
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE patrimonio_localizacao_historico (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patrimonio_id UUID NOT NULL,
        localizacao_anterior VARCHAR(255),
        localizacao_nova VARCHAR(255) NOT NULL,
        data_mudanca TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        usuario_id UUID,
        observacoes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patrimonio_id) REFERENCES patrimonios(id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_patrimonio_localizacao_historico_patrimonio_id 
        ON patrimonio_localizacao_historico(patrimonio_id);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_patrimonio_localizacao_historico_data_mudanca 
        ON patrimonio_localizacao_historico(data_mudanca DESC);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_patrimonio_localizacao_historico_data_mudanca;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_patrimonio_localizacao_historico_patrimonio_id;
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS patrimonio_localizacao_historico;
    `);
  }
}


