import User from 'models/user'
import Note from 'models/note'

export default {
  User: {},
  Query: {
    getUser: async (parent, { id }) => {
      try {
        const user = await User.where('id', id).fetch({
          withRelated: ['notes']
        })
        return user.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allUsers: async () => {
      try {
        const users = await User.fetchAll({ withRelated: ['notes'] })
        return users.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  }
}
