import User from 'models/user'

export default {
  // User: {},
  Query: {
    getUser: async (parent, { id }) => {
      try {
        const user = await User.where('id', id).fetch()
        return user.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allUsers: async () => {
      try {
        const users = await User.fetchAll()
        return users.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  }
}
