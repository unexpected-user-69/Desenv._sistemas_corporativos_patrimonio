const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'patrimonio_inventario',
});

async function test() {
  await client.connect();
  const result = await client.query('SELECT password_hash FROM users WHERE email=$1', ['admin2@dev.local']);
  
  if (result.rows.length > 0) {
    const hash = result.rows[0].password_hash;
    const valid1 = await bcrypt.compare('Admin2Password123!', hash);
    const valid2 = await bcrypt.compare('Admin2Password123!your-pepper-here', hash);
    
    console.log('Senha valida (sem pepper):', valid1);
    console.log('Senha valida (com pepper):', valid2);
  }
  
  await client.end();
}

test();

