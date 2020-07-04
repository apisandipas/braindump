const faker = require("faker");
const range = require("lodash.range");
const map = require("lodash.map");

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex("notes").del();

  // fetch existing ids.
  const user_ids = await knex.table("users").pluck("id");
  const notebook_ids = await knex.table("notebooks").pluck("id");

  // Create 100 Notes
  const notes = map(range(1, 100, 1), () => {
    const richTextContent = [
      {
        type: "paragraph",
        children: [{ text: faker.lorem.paragraphs(4) }]
      }
    ];

    return {
      user_id: faker.random.arrayElement(user_ids),
      notebook_id: faker.random.arrayElement(notebook_ids),
      title: faker.lorem.words(),
      body: JSON.stringify(richTextContent),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    };
  });

  // Add a note with Markdown content
  notes.push({
    user_id: faker.random.arrayElement(user_ids),
    notebook_id: faker.random.arrayElement(notebook_ids),
    title: "Markdown example",
    body: JSON.stringify([
      {
        type: "block-quote",
        children: [{ text: "A wise quote." }]
      },
      {
        type: "paragraph",
        children: [
          {
            text:
              'Order when you start a line with "## " you get a level-two heading, like this:'
          }
        ]
      },
      {
        type: "heading-two",
        children: [{ text: "Try it out!" }]
      },
      {
        type: "paragraph",
        children: [
          {
            text:
              'Try it out for yourself! Try starting a new line with ">", "-", or "#"s.'
          }
        ]
      }
    ]),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent()
  });

  await knex("notes").insert(notes);
};
