const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'patrimonio_inventario',
});

client.connect()
  .then(() => {
    console.log('OK: Conectado ao banco!');
    client.end();
  })
  .catch((err) => {
    console.log('ERRO:', err.message);
    process.exit(1);
  });

