/*global require module process */
// Update with your config settings.
require('dotenv').config()

const { DB_DRIVER, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env

module.exports = {
  development: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 50
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: '33060',
      database: 'noteapp_test',
      user: 'homestead',
      password: 'secret'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'noteapp_staging',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'noteapp_prod',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
