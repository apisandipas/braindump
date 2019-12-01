import { tryLogin } from 'services/auth'
import { formatErrors } from 'services/errors'

export default {
  Query: {
    me: async (_, __, { req, models }) => {
      if (!req.user || !req.user.id) return null
      const user = await models.User.where({ id: req.user.id }).fetch()
      return user.toJSON()
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
    login: async (_, { email, password }) => tryLogin(email, password)
  }
}
