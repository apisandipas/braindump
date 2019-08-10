import Note from 'models/note'

export default {
  Note: {},
  Query: {
    allNotes: async () => {
      try {
        const notes = await Note.fetchAll()
        return notes.toJSON()
      } catch (err) {
        return new Error(err.message)
      }
    }
  }
}
