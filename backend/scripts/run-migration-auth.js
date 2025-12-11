const { AppDataSource } = require('./dist/src/database/data-source.js');

async function runMigrations() {
  try {
    console.log('🔄 Inicializando conexão com banco de dados...');
    await AppDataSource.initialize();
    console.log('✅ Conexão estabelecida');

    console.log('🚀 Executando migrações pendentes...');
    const migrations = await AppDataSource.runMigrations();

    if (migrations.length === 0) {
      console.log('✅ Nenhuma migração pendente');
    } else {
      console.log(`✅ ${migrations.length} migração(ões) executada(s):`);
      migrations.forEach((migration, index) => {
        console.log(`  ${index + 1}. ${migration.name}`);
      });
    }

    await AppDataSource.destroy();
    console.log('🔌 Conexão fechada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar migrações:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

runMigrations();

