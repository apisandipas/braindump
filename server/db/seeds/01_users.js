/*global exports require*/
const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      let users = map(range(1, 10, 1), i => {
        return {
          id: i,
          email: faker.internet.email(),
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          password_digest: faker.random.uuid(),
          created_at: new Date(),
          updated_at: new Date()
        }
      })
      users.push({
        id: 100,
        email: faker.internet.email(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        password_digest: faker.random.uuid(),
        role: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date()
      })
      return knex('users').insert(users)
    })
}
