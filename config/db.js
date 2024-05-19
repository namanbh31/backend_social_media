const { Pool } = require('pg');

const pool = new Pool({
  user: 'user1',
  host: 'dpg-cp4biiq1hbls73ev0igg-a.oregon-postgres.render.com',
  database: 'toddle_mlpf',
  password: 'RfUmgYmQh6ZoLwkDVoncAUa15YRAGG1K',
  port: 5432,
  keepAlive:true,
  ssl:true,
});

module.exports = pool;