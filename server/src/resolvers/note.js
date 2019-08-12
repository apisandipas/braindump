import { formatErrors } from 'services/errors'

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
    createNote: async (parent, { values }, { models }) => {
      try {
        const note = await models.Note.create(values)
        if (note) {
          return {
            ok: true,
            note: note.toJSON()
          }
        }
      } catch (err) {
        console.log('createNote err', err)
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    updateNote: async (parent, { id, values }, { models }) => {
      try {
        const note = await models.Note.update(values, { id })
        if (note) {
          return {
            ok: true,
            note: note.toJSON()
          }
        }
      } catch (err) {
        console.log('updateNote err', err)
        return {
          ok: false,
          errors: formatErrors(err)
        }
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
