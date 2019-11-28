import db, { ModelBase } from 'database'
import User from './user'
import Notebook from './notebook'
import Joi from '@hapi/joi'

const Note = ModelBase.extend({
  tableName: 'notes',
  user() {
    return this.belongsTo(User)
  },
  notebook() {
    return this.belongsTo(Notebook)
  },
  validate: {
    title: Joi.string()
      .min(3)
      .max(30)
      .required(),
    body: Joi.string().required()
  }
})

export default db.model('Note', Note)
