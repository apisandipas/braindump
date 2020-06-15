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
    username: Joi.string().required(),
    passwordDigest: Joi.string(),
    passwordResetToken: Joi.any().allow(null),
    passwordResetExpires: Joi.any().allow(null),
    email: Joi.string()
      .email()
      .required(),
    role: Joi.string(),
    invalidationCount: Joi.number(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date()
  }
})

export default db.model('User', User)
