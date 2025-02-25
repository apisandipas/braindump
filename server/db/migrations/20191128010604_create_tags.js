exports.up = knex => {
  return Promise.all([
    knex.schema.createTable("notes_tags", table => {
      table.increments("id").primary();
      table
        .integer("tag_id")
        .notNull()
        .unsigned()
        .index()
        .references("tags.id")
        .onDelete("CASCADE");
      table
        .integer("note_id")
        .notNull()
        .unsigned()
        .index()
        .references("notes.id")
        .onDelete("CASCADE");
    }),
    knex.schema.createTable("tags", table => {
      table.increments("id").primary();
      table.string("name").notNull();
      table.integer("user_id").notNull();
      table.dateTime("created_at").notNull();
      table.dateTime("updated_at").nullable();
    })
  ]);
};

exports.down = knex => {
  return Promise.all([
    knex.schema.dropTable("notes_tags"),
    knex.schema.dropTable("tags")
  ]);
};
