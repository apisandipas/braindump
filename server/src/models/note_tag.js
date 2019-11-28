import db, { ModelBase } from 'database'
import Note from './note'
import Tag from './tag'

// Pivot table
const NoteTag = ModelBase.extend({
  tableName: 'notes_tags',
  note: function() {
    return this.belongsTo(Note)
  },
  tag: function() {
    return this.belongsTo(Tag)
  }
})

export default db.model('NoteTag', NoteTag)
