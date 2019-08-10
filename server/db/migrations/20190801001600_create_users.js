/*global exports*/
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary()
    table.string('email')
    table.unique('email')
    table.string('name').notNull()
    table.string('username')
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
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
