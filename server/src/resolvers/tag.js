import { formatErrors } from 'services/errors'

export default {
  Note: {},
  Query: {
    getTag: async (parent, { id }, { models }) => {
      try {
        const tag = await models.Tag.findById(id)
        return tag.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    },
    allTags: async (parent, args, { models }) => {
      try {
        const tags = await models.Tag.fetchAll()
        return tags.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  },
  Mutation: {
    createTag: async (parent, { values }, { models }) => {
      try {
        const tag = await models.Tag.create(values)
        if (tag) {
          return {
            ok: true,
            note: tag.toJSON()
          }
        }
      } catch (err) {
        console.log('createTag err', err)
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    updateTag: async (parent, { id, values }, { models }) => {
      try {
        const tag = await models.Tag.update(values, { id })
        if (tag) {
          return {
            ok: true,
            note: tag.toJSON()
          }
        }
      } catch (err) {
        console.log('updateTag err', err)
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    deleteTag: async (parent, args, { models }) => {
      try {
        await models.Tag.destroy(args)
        return true
      } catch (err) {
        return false
      }
    }
  }
}
