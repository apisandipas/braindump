import { sign, decode, verify } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import models from 'models'

export const createTokens = (user, ACCESS_TOKEN_SECRET, refreshSecret) => {
  const accessToken = sign(
    {
      user: {
        id: user.get('id'),
        email: user.get('email'),
        username: user.get('username'),
        role: user.get('role')
      }
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1hr'
    }
  )

  const refreshToken = sign({ user: { id: user.get('id') } }, refreshSecret, {
    expiresIn: '7d'
  })

  return { accessToken, refreshToken }
}

export const refreshTokens = async (refreshToken, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET) => {
  let userId
  try {
    const {
      user: { id }
    } = decode(refreshToken)
    userId = id
  } catch (err) {
    return {}
  }

  if (!userId) return {}

  const user = await models.User.where({ id: userId }).fetch()

  if (!user) return {}

  const refreshSecret = user.get('passwordHash') + REFRESH_TOKEN_SECRET

  try {
    verify(refreshToken, refreshSecret)
  } catch (err) {
    return {}
  }

  const { accessToken, refreshToken: newRefreshToken } = createTokens(
    user,
    ACCESS_TOKEN_SECRET,
    refreshSecret
  )

  return {
    token: accessToken,
    refreshToken: newRefreshToken,
    user
  }
}

// Return a generic message instead of divulging a valid email login
const invalidCredentialsResponse = {
  ok: false,
  errors: [
    {
      path: 'invalid-credentials',
      message: 'Error! Invalid credentials.'
    }
  ]
}

export const tryLogin = async (email, password) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
  const user = await models.User.where({ email }).fetch()
  if (!user) return invalidCredentialsResponse

  const valid = await bcrypt.compare(password, user.get('passwordDigest'))
  if (!valid) return invalidCredentialsResponse

  const refreshSecret = user.get('passwordDigest') + REFRESH_TOKEN_SECRET
  const { accessToken, refreshToken } = createTokens(user, ACCESS_TOKEN_SECRET, refreshSecret)

  return {
    ok: true,
    token: accessToken,
    refreshToken: refreshToken
  }
}
