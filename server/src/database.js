import knexConfig from '../knexfile'
import Knex from 'knex'
import bookshelf from 'bookshelf'
// import securePassword from 'bookshelf-secure-password'

const env = process.env.NODE_ENV || 'development' // eslint-disable-line no-undef
const knex = Knex(knexConfig[env])

const db = bookshelf(knex)

db.plugin('registry')
db.plugin('virtuals')
db.plugin('visibility')
db.plugin('pagination')
// db.plugin(securePassword)

export default db
