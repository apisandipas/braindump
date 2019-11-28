import { formatErrors } from 'services/errors'
export default {
  User: {
    notebooks: async (parent, args, { models }) => {
      try {
        const notebooks = await models.Notebook.where({
          user_id: parent.id
        }).fetch()
        const notebooksJSON = notebooks.toJSON()
        return notebooksJSON.length ? notebooksJSON : [notebooksJSON]
      } catch (err) {
        return new Error(err.message)
      }
    },
    notes: async (parent, args, { models }) => {
      try {
        const notes = await models.Note.where({ user_id: parent.id }).fetch()
        const notesJSON = notes.toJSON()
        return notesJSON.length ? notesJSON : [notesJSON]
      } catch (err) {
        return new Error(err.message)
      }
    }
  },
  Query: {
    getUser: async (parent, { id }, { models }) => {
      try {
        const user = await models.User.findById(id)
        return user.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allUsers: async (parent, args, { models }) => {
      try {
        const users = await models.User.fetchAll()
        return users.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const existingUser = await models.User.findOne({ email: args.email }, { require: false })
        if (existingUser) {
          return {
            ok: false,
            errors: [
              {
                path: 'email',
                message: `Error! Your must pick a unique email.`
              }
            ]
          }
        }
        const user = await models.User.create(args)
        if (user) {
          return {
            ok: true,
            user: user.toJSON()
          }
        }
      } catch (err) {
        console.log('register err', JSON.stringify(err))
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    updateUser: async (parent, { id, ...args }, { models }) => {
      try {
        const user = await models.User.update(args, { id })
        return {
          ok: true,
          user: user.toJSON()
        }
      } catch (err) {
        console.log('err', err)
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    deleteUser: async (parent, args, { models }) => {
      try {
        await models.User.destroy(args)
        return true
      } catch (err) {
        return false
      }
    }
  }
}
