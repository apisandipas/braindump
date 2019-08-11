const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')
const random = require('lodash.random')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('notes').del()

  // Create 100 Notes
  const notes = map(range(1, 100, 1), i => {
    const user_id = random(1, 9)
    return {
      id: i,
      user_id,
      title: i + ' ' + faker.lorem.words(),
      body: faker.lorem.paragraphs(5),
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await knex('notes').insert(notes)
}
