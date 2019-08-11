import db, { ModelBase } from 'database'
import Note from './note'
import Joi from '@hapi/joi'

const User = ModelBase.extend({
  tableName: 'users',
  hasSecurePassword: true,
  hidden: ['password_digest', 'password_reset_token', 'password_reset_expires'],
  notes() {
    return this.hasMany(Note)
  },
  validate: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
  }
})

export default db.model('User', User)
