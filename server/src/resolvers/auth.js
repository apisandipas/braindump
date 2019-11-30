import bcrypt from 'bcrypt'
import { formatErrors } from 'services/errors'
import { createTokens } from 'services/auth'

const invalidCredsResponse = {
  ok: false,
  error: {
    path: 'invalid-credentials',
    message: 'Error! Invalid credentials'
  }
}

export default {
  Query: {},
  Mutation: {
    login: async (parent, { email, password }, { models, res }) => {
      try {
        const user = await models.User.where({ email }).fetch()
        if (!user) return invalidCredsResponse

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return invalidCredsResponse

        const { accessToken, refreshToken } = createTokens(user)

        res.cookie('refresh-token', refreshToken)
        res.cookie('access-token', accessToken)

        return {
          ok: true,
          user
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    }
    // forgotPassword: async (parent, { email }, { models }) => {
    //   try {
    //   } catch (err) {
    //     return {
    //       ok: false,
    //       errors: formatErrors(err)
    //     }
    //   }
    // }
  }
}
