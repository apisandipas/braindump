export default {
  Note: {},
  Query: {
    allNotes: async (parent, args, { models }) => {
      try {
        const notes = await models.Note.fetchAll()
        return notes.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  }
}
