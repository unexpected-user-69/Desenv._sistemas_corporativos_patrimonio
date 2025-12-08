/**
 * Script para corrigir a senha do admin
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const adminEmail = 'admin@admin.local';
const adminPassword = 'AdminPassword123!';
const pepper = process.env.HASH_PEPPER || 'test_pepper_super_secret_do_not_use_in_production_123456';
const saltRounds = 10;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function fixPassword() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Gerar hash com pepper
    const passwordWithPepper = adminPassword + pepper;
    console.log(`🔑 Gerando hash para senha: "${adminPassword}"`);
    console.log(`   Pepper: ${pepper.substring(0, 20)}...`);
    
    const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
    console.log(`   Hash gerado: ${passwordHash.substring(0, 30)}...\n`);

    // Atualizar no banco
    const result = await client.query(
      `UPDATE users.users 
       SET password_hash = $1, 
           updated_at = NOW()
       WHERE email = $2
       RETURNING id, email, name, role`,
      [passwordHash, adminEmail.toLowerCase()]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('✅ Senha atualizada com sucesso!');
      console.log(`   Usuário: ${user.email}`);
      console.log(`   Role: ${user.role}\n`);
      
      // Verificar se funciona
      const verifyResult = await client.query(
        `SELECT password_hash FROM users.users WHERE email = $1`,
        [adminEmail.toLowerCase()]
      );
      
      if (verifyResult.rows.length > 0) {
        const storedHash = verifyResult.rows[0].password_hash;
        const isValid = await bcrypt.compare(passwordWithPepper, storedHash);
        console.log(`🔍 Verificação: ${isValid ? '✅ Hash válido!' : '❌ Hash inválido!'}\n`);
      }
    } else {
      console.log('❌ Usuário não encontrado');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixPassword();

