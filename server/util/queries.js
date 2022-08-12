const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: process.env.NEXT_PUBLIC_ENV_PGHOST,
    database: 'postgres',
    password: process.env.NEXT_PUBLIC_ENV_PGPASS,
    port: process.env.NEXT_PUBLIC_ENV_PGPORT,
});


module.exports = {
    query: (text, params) => pool.query(text, params),
    connect: () => pool.connect(),
    pool: pool
}
