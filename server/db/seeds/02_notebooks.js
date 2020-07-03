const faker = require("faker");
const range = require("lodash.range");
const map = require("lodash.map");

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex("notebooks").del();
  const user_ids = await knex.table("users").pluck("id");

  // Create 10 Notesbooks
  const notebooks = map(range(1, 9, 1), () => {
    return {
      user_id: faker.random.arrayElement(user_ids),
      name: faker.lorem.words(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    };
  });

  await knex("notebooks").insert(notebooks);
};
