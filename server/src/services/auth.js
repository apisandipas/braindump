import { sign } from 'jsonwebtoken'

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env

export const createTokens = user => {
  const refreshToken = sign(
    { userId: user.get('id'), count: user.get('count') },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  )
  const accessToken = sign({ userId: user.get('id') }, ACCESS_TOKEN_SECRET, { expiresIn: '15min' })

  return { refreshToken, accessToken }
}
