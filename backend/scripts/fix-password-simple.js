const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const pepper = process.env.HASH_PEPPER || 'test_pepper_super_secret_do_not_use_in_production_123456';
const password = 'AdminPassword123!';
const passwordWithPepper = password + pepper;

(async () => {
  const hash = await bcrypt.hash(passwordWithPepper, 10);
  console.log(hash);
  
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  
  await client.connect();
  await client.query('UPDATE users.users SET password_hash = $1, updated_at = NOW() WHERE email = $2', [hash, 'admin@admin.local']);
  console.log('OK');
  await client.end();
})();

