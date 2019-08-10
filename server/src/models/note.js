import db, { ModelBase } from 'database';
import User from './user';
import Joi from '@hapi/joi';

const Note = ModelBase.extend({
  tableName: 'notes',
  hasTimestamps: ['created_at', 'updated_at'],
  user() {
    return this.belongsTo(User);
  },
  validate: {
    title: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    body: Joi.string()
      .alphanum()
      .required()
  }
});

export default db.model('Note', Note);
