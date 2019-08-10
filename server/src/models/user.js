import db, { ModelBase } from 'database'
import Note from './note'

const User = ModelBase.extend({
  tableName: 'users',
  hasSecurePassword: true,
  hidden: ['password_digest', 'password_reset_token', 'password_reset_expires'],
  hasTimestamps: ['created_at', 'updated_at'],
  notes() {
    return this.hasMany(Note)
  }
})

export default db.model('User', User)
