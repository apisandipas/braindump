import { tryLogin } from 'services/auth'

export default {
  Query: {
    me: async (_, __, { req, models }) => {
      if (!req.user || !req.user.id) return null
      const user = await models.User.where({ id: req.user.id }).fetch()
      return user.toJSON()
    }
  },
  Mutation: {
    login: async (_, { email, password }) => tryLogin(email, password),
    invalidateTokens: async (_, __, { req, models }) => {
      if (!req.userId) {
        return false
      }

      models.User.query()
        .where({ id: req.userId })
        .increment('count', 1)

      req.clearCookie('access-token')

      return true
    }
  }
}
