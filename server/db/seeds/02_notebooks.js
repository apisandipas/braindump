const faker = require("faker");
const range = require("lodash.range");
const map = require("lodash.map");

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex("notebooks").del();

  const admin_user = await knex
    .table("users")
    .where("email", "bparonto@gmail.com")
    .select("id", "email");

  // Create 10 Notesbooks
  const notebooks = map(range(1, 9, 1), () => {
    return {
      user_id: admin_user[0].id,
      name: faker.lorem.words(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    };
  });

  notebooks.push({
    user_id: admin_user[0].id,
    name: admin_user[0].email + "'s Notebook",
    created_at: faker.date.recent(),
    updated_at: faker.date.recent()
  });

  notebooks.reverse();

  await knex("notebooks").insert(notebooks);
};
