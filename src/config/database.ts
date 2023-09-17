const { Pool } = require('pg');
var dotenv = require('dotenv');

dotenv.config();

module.exports = new Pool({
    user: process.env.POSTGRE_USER,
    host: process.env.POSTGRE_HOST,
    database: process.env.POSTGRE_DB,
    password: process.env.POSTGRE_PASSWORD,
    port: process.env.POSTGRE_PORT
})
