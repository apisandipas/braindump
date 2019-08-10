/*global exports require*/
const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')
const random = require('lodash.random')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function() {
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
      return knex('notes').insert(notes)
    })
}
