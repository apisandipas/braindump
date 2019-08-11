exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('email')
    table.unique('email')
    table.string('username')
    table.unique('username')
    table.text('password_digest').notNull()
    table.dateTime('created_at').notNull()
    table.dateTime('updated_at').nullable()
    table
      .string('role')
      .notNull()
      .defaultTo('USER')
    table.string('password_reset_token')
    table.string('password_reset_expires')
  })

exports.down = knex => knex.schema.dropTable('users')
