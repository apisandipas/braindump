import bcrypt from 'bcrypt'
import { formatErrors } from 'services/errors'
import { createTokens } from 'services/auth'

const invalidCredentialsResponse = {
  ok: false,
  error: {
    path: 'invalid-credentials',
    message: 'Error! Invalid credentials'
  }
}

export default {
  Query: {
    me: async (_, __, { req, models }) => {
      if (!req.userId) return null
      const user = await models.User.where({ id: req.userId }).fetch()
      return user.toJSON()
    }
  },
  Mutation: {
    login: async (_, { email, password }, { models, res }) => {
      try {
        const user = await models.User.where({ email }).fetch()
        if (!user) return invalidCredentialsResponse

        const valid = await bcrypt.compare(password, user.get('passwordDigest'))
        if (!valid) return invalidCredentialsResponse

        const { accessToken, refreshToken } = createTokens(user)

        res.cookie('refresh-token', refreshToken)
        res.cookie('access-token', accessToken)

        return {
          ok: true,
          user: user.toJSON()
        }
      } catch (err) {
        // throw err
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
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
