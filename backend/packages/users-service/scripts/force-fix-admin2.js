/**
 * Script para forçar a correção da senha do admin2
 * Cria a senha SEM pepper para garantir que funcione
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const admin2Email = 'admin2@dev.local';
const admin2Password = 'Admin2Password123!';
const admin2Name = 'Admin 2 Dev';

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'patrimonio_inventario',
};

async function fix() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco\n');

    // Criar hash SEM pepper (para garantir compatibilidade)
    const passwordHash = await bcrypt.hash(admin2Password, 10);
    console.log('🔐 Hash criado SEM pepper\n');

    // Atualizar usuário
    await client.query(
      `UPDATE users 
       SET password_hash = $1, 
           name = $2, 
           role = $3,
           is_active = true,
           deleted_at = NULL,
           updated_at = NOW()
       WHERE email = $4`,
      [passwordHash, admin2Name, 'ADMIN', admin2Email.toLowerCase()]
    );
    
    console.log('✅ Usuário admin2 atualizado com senha SEM pepper');
    console.log('\n🔑 Credenciais:');
    console.log(`   Email: ${admin2Email}`);
    console.log(`   Password: ${admin2Password}`);
    console.log('\n💡 Agora teste o login novamente!\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

fix();

