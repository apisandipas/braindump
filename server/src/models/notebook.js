import db, { ModelBase } from 'database'
import User from './user'
import Joi from '@hapi/joi'

const Notebook = ModelBase.extend({
  tableName: 'notebooks',
  user() {
    return this.belongsTo(User)
  },
  validate: {
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  }
})

export default db.model('Notebook', Notebook)
