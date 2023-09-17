const dotenv = require('dotenv');

dotenv.config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRE_DB,
      user:     process.env.POSTGRE_USER ,
      password: process.env.POSTGRE_PASSWORD,
      port: process.env.POSTGRE_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
