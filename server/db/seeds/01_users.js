const faker = require('faker')
const range = require('lodash.range')
const map = require('lodash.map')
const bcrypt = require('bcryptjs')

const PASSWORD = 'password123'

const hashPassword = async (password = PASSWORD) => {
  const hashedPassword = await bcrypt.hashSync(password, 12)
  return hashedPassword
}

exports.seed = async knex => {
  const password_digest = await hashPassword()

  // Deletes ALL existing entries
  await knex('users').del()

  // Create 10 new Users
  let users = map(range(1, 10, 1), () => {
    return {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password_digest,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    }
  })

  // Create an admin
  users.push({
    // id: 100,
    email: 'bparonto@gmail.com',
    username: faker.internet.userName(),
    password_digest,
    role: 'ADMIN',
    created_at: faker.date.recent(),
    updated_at: faker.date.recent()
  })

  await knex('users').insert(users)
}
