const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('notes').del()

  // fetch existing ids.
  const user_ids = await knex.table('users').pluck('id')
  const notebook_ids = await knex.table('notebooks').pluck('id')

  // Create 100 Notes
  const notes = map(range(1, 100, 1), i => {
    return {
      id: i,
      user_id: faker.random.arrayElement(user_ids),
      notebook_id: faker.random.arrayElement(notebook_ids),
      title: i + ' ' + faker.lorem.words(),
      body: faker.lorem.paragraphs(5),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    }
  })

  await knex('notes').insert(notes)
}
