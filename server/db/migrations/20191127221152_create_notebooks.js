exports.up = knex =>
  knex.schema.createTable('notebooks', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.integer('user_id').notNull()
    table.dateTime('created_at').notNull()
    table.dateTime('updated_at').nullable()
  })

exports.down = knex => knex.schema.dropTable('notebooks')
