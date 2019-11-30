import '@babel/polyfill'
import path from 'path'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import models from 'models'

dotenv.config()

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))
const port = process.env.PORT || 8080
const app = express()

app.use(cors('*'))

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
