import { formatErrors } from 'services/errors'

export default {
  Notebook: {
    notes: async (parent, args, { models }) => {
      try {
        const notes = await models.Note.where({
          notebook_id: parent.id
        }).fetch()
        const notesJSON = notes.toJSON()
        return notesJSON.length ? notesJSON : [notesJSON]
      } catch (err) {
        return new Error(err.message)
      }
    }
  },
  Query: {
    getNotebook: async (parent, { id }, { models }) => {
      try {
        const notebook = await models.Notebook.findById(id)
        return notebook.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allNotebooks: async (parent, args, { models }) => {
      try {
        const notebooks = await models.Notebook.fetchAll()
        return notebooks.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  },
  Mutation: {
    createNotebook: async (parent, { values }, { models }) => {
      try {
        const notebook = await models.Notebook.create(values)
        if (notebook) {
          return {
            ok: true,
            note: notebook.toJSON()
          }
        }
      } catch (err) {
        console.log('createNotebook err', err)
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    updateNotebook: async (parent, { id, values }, { models }) => {
      try {
        const notebook = await models.Notebook.update(values, { id })
        if (notebook) {
          return {
            ok: true,
            note: notebook.toJSON()
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
    deleteNotebook: async (parent, args, { models }) => {
      try {
        await models.Notebook.destroy(args)
        return true
      } catch (err) {
        return false
      }
    }
  }
}
