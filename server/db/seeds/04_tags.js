const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')
const random = require('lodash.random')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('tags').del()
  // await knex('notes_tags').del()

  // Create 10 Tag
  const tags = map(range(1, 9, 1), i => {
    return {
      id: i,
      name: i + ' ' + faker.lorem.word(),
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  const notes_tags = map(range(1, 9, 1), i => {
    const note_id = random(1, 9)
    const tag_id = random(1, 9)
    return {
      id: i,
      note_id,
      tag_id
    }
  })

  await knex('tags').insert(tags)
  await knex('notes_tags').insert(notes_tags)
}
