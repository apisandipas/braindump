import '@babel/polyfill'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import models from 'models'
import { createTokens } from 'services/auth'

dotenv.config()

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))
const port = process.env.PORT || 8080
const app = express()

app.use(cors('*'))
app.use(cookieParser())

app.use(async (req, res, next) => {
  const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env
  const refreshToken = req.cookies['refresh-token']
  const accessToken = req.cookies['access-token']

  if (!refreshToken && !accessToken) {
    return next()
  }

  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET)
    req.userId = data.userId
    return next()
  } catch (err) {
    // let it fail silently
  }

  if (!refreshToken) {
    return next()
  }

  let data

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET)
  } catch (err) {
    return next()
  }

  const user = await models.User.where({ id: data.userId }).fetch()
  // token has been invalidated
  if (!user || user.get('count') !== data.count) {
    return next()
  }

  const tokens = createTokens(user)
  res.cookie('refresh-token', tokens.refreshToken)
  res.cookie('access-token', tokens.accessToken)
  req.userId = user.get('id')

  next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ models, req, res }),
  playground: process.env.NODE_ENV === 'development'
})

server.applyMiddleware({ app })

app.listen({ port }, () => {
  console.log(`🚀  Server ready at http://locahost:${port}${server.graphqlPath}`) // eslint-disable-line no-console
})
