import knexConfig from '../knexfile';
import Knex from 'knex';
import bookshelf from 'bookshelf';
import makeModelBase, {
  pluggable as baseModalPlugin
} from 'bookshelf-modelbase';
// import securePassword from 'bookshelf-secure-password'

const env = process.env.NODE_ENV || 'development'; // eslint-disable-line no-undef
const knex = Knex(knexConfig[env]);

const db = bookshelf(knex);

db.plugin('registry');
db.plugin('virtuals');
db.plugin('visibility');
db.plugin('pagination');
db.plugin(baseModalPlugin);
// db.plugin(securePassword)

export const ModelBase = makeModelBase(db);

export default db;
