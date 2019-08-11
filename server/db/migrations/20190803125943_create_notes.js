exports.up = knex =>
  knex.schema.createTable('notes', table => {
    table.increments('id').primary()
    table.string('title').notNull()
    table.text('body').notNull()
    table.integer('user_id').notNull()
    table.dateTime('created_at').notNull()
    table.dateTime('updated_at').nullable()
  })

exports.down = knex => knex.schema.dropTable('notes')
