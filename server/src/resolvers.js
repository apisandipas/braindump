import User from 'models/user'
import Note from 'models/note'

export default {
  User: {},
  Query: {
    getUser: async (parent, { id }) => {
      try {
        const notes = await User.where('id', id).fetch({
          withRelated: ['notes']
        })
        return notes.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allNotes: async () => {
      try {
        const notes = await Note.fetchAll()
        return notes.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allUsers: async () => {
      try {
        const users = await User.fetchAll({ withRelated: ['notes'] })
        return users.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  }
}
