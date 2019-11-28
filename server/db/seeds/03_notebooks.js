const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')
const random = require('lodash.random')

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('notebooks').del()

  // Create 100 Notes
  const notebooks = map(range(1, 9, 1), i => {
    const user_id = random(1, 9)

    return {
      id: i,
      user_id,
      name: i + ' ' + faker.lorem.words(),
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await knex('notebooks').insert(notebooks)
}
