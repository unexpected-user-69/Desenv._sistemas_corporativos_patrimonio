const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const pepper = process.env.HASH_PEPPER || 'test_pepper_super_secret_do_not_use_in_production_123456';
const password = 'AdminPassword123!';
const passwordWithPepper = password + pepper;

(async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  
  await client.connect();
  const result = await client.query('SELECT password_hash FROM users.users WHERE email = $1', ['admin@admin.local']);
  const storedHash = result.rows[0].password_hash;
  
  console.log('Hash no banco:', storedHash.substring(0, 40));
  console.log('Pepper:', pepper.substring(0, 30));
  console.log('Senha:', password);
  console.log('Senha + Pepper:', passwordWithPepper.substring(0, 50));
  
  const isValid = await bcrypt.compare(passwordWithPepper, storedHash);
  console.log('Resultado:', isValid ? '✅ VÁLIDO' : '❌ INVÁLIDO');
  
  await client.end();
})();

