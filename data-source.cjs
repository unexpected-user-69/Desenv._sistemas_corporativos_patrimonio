const { DataSource } = require('typeorm');
require('dotenv').config();

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'app',
  password: process.env.DB_PASS || 'app',
  database: process.env.DB_NAME || 'inventario',
  entities: [__dirname + '/dist/**/*.entity.js'],
  migrations: [__dirname + '/dist/migrations/*.js'],
  synchronize: false,
  logging: false,
});
