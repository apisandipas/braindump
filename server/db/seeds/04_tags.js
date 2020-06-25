const faker = require("faker");
const range = require("lodash.range");
const map = require("lodash.map");

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex("tags").del();
  await knex("notes_tags").del();

  const user_ids = await knex.table("users").pluck("id");

  // Create 10 Tag
  const tags = map(range(1, 9, 1), i => {
    return {
      name: i + " " + faker.lorem.word(),
      created_at: faker.date.recent(),
      user_id: faker.random.arrayElement(user_ids),
      updated_at: faker.date.recent()
    };
  });

  await knex("tags").insert(tags);

  const note_ids = await knex.table("notes").pluck("id");
  const tag_ids = await knex.table("tags").pluck("id");

  const notes_tags = map(range(1, 9, 1), () => {
    return {
      note_id: faker.random.arrayElement(note_ids),
      tag_id: faker.random.arrayElement(tag_ids)
    };
  });

  await knex("notes_tags").insert(notes_tags);
};
