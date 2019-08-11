import { formatErrors } from 'services/utils'
export default {
  User: {},
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
        const existingUser = await models.User.findOne({ email: args.email })
        if (existingUser) {
          return {
            ok: false,
            errors: [{ path: 'email', message: 'This email is already taken.' }]
          }
        }
        const user = await models.User.create(args)
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
