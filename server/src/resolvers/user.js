export default {
  // User: {},
  Query: {
    getUser: async (parent, { id }, { models }) => {
      try {
        const user = await models.User.findById(id)
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
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        // TODO: update to hash password with bcrypt
        const user = await models.User.create(args)
        return user.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    updateUser: async (parent, args, { models }) => {
      try {
        const user = await models.User.update(args)
        return user.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    deleteUser: async (parent, args, { models }) => {
      try {
        await models.User.destroy(args)
        return true
      } catch (err) {
        return false
      }
    }
  }
}
