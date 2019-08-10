import '@babel/polyfill'
import path from 'path'
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'

dotenv.config()
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const port = process.env.PORT || 8080

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
