import '@babel/polyfill'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { verify } from 'jsonwebtoken'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import models from 'models'
import path from 'path'
import { refreshTokens } from 'services/auth'

dotenv.config()

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))
const port = process.env.PORT || 8080
const app = express()

app.use(cors('*'))
app.use(cookieParser())

app.use(async (req, res, next) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
  const accessToken = req.headers['x-token']
  if (accessToken) {
    try {
      const { user } = verify(accessToken, ACCESS_TOKEN_SECRET)
      req.user = user
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token']
      const newTokens = await refreshTokens(refreshToken, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET)
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
        res.set('x-token', newTokens.token)
        res.set('x-refresh-token', newTokens.refreshToken)
      }
      req.user = newTokens.token
    }
  }
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
