import '@babel/polyfill'
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import typeDefs from 'schema'
import resolvers from 'resolvers'

dotenv.config()

const port = process.env.PORT || 8080 // eslint-disable-line no-undef

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`) // eslint-disable-line no-undef
})
