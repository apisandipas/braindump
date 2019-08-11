export default {
  Note: {},
  Query: {
    getNote: async (parent, { id }, { models }) => {
      try {
        const note = await models.Note.findById(id)
        return note.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allNotes: async (parent, args, { models }) => {
      try {
        const notes = await models.Note.fetchAll()
        return notes.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  },
  Mutation: {
    createNote: async (parent, args, { models }) => {
      try {
        const note = await models.Note.create(args)
        return note.json()
      } catch (err) {
        return new Error(err.message)
      }
    },
    updateNote: async (parent, { id, values }, { models }) => {
      try {
        const note = await models.Note.update(values, { id })
        return note.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    deleteNote: async (parent, args, { models }) => {
      try {
        await models.Note.destroy(args)
        return true
      } catch (err) {
        return false
      }
    }
  }
}
