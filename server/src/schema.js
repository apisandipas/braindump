export default `
  type Note {
    id: ID!
    title: String!
    body: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    notes: [Note!]!
  }

  type Query {
    allNotes: [Note]!
    getNote(id: ID!): Note!
    allUsers: [User]!
    getUser(id: ID!): User
  }

  type Mutation {
    createNote(title: String!, body: String!): Note
  }
`
