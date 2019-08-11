export default {
  // User: {},
  Query: {
    getUser: async (parent, { id }, { models }) => {
      try {
        const user = await models.User.where('id', id).fetch()
        return user.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allUsers: async (parent, args, { models }) => {
      try {
        const users = await models.User.fetchAll()
        return users.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  }
}
