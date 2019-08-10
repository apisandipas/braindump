import db from 'database'
import User from './user'

const Note = db.Model.extend({
  tableName: 'notes',
  hasTimestamps: ['created_at', 'updated_at'],
  user() {
    return this.belongsTo(User)
  }
})

export default db.model('Note', Note)
