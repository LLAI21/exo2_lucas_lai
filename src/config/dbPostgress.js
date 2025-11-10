import { Pool } from 'pg';

const pool = new Pool({
  user: 'lucas',
  host: 'localhost',
  database: 'ma_base',
  password: '1234',
  port: 5432,
});

const result = await pool.query('SELECT * FROM users');
console.log(result.rows);

export default pool